import { buildRelationalQuery, getDecoder, getSQL, toSelection } from "./utils-Brc9vC7H.js";
import { QueryPromise, SQL, StringChunk, isSQLWrapper, sql } from "drizzle-orm";

//#region src/mergeRelationsFilter.ts
/**
* Merge two `where` filters for Drizzle's RelationalQueryBuilder API.
*/
function mergeRelationsFilter(left, right) {
	if (!left || !right) return left ?? right;
	const mergedOps = {};
	if (left.OR && right.OR) {
		mergedOps.AND ??= [...left.AND ?? [], ...right.AND ?? []];
		mergedOps.AND.push({ OR: left.OR }, { OR: right.OR });
		mergedOps.OR = void 0;
	}
	if (left.RAW && right.RAW) {
		mergedOps.AND ??= [...left.AND ?? [], ...right.AND ?? []];
		mergedOps.AND.push({ RAW: left.RAW }, { RAW: right.RAW });
		mergedOps.RAW = void 0;
	}
	if (left.NOT && right.NOT) mergedOps.NOT = mergeRelationsFilter(left.NOT, right.NOT);
	return {
		...left,
		...right,
		...mergedOps
	};
}

//#endregion
//#region src/mergeFindManyArgs.ts
/**
* Merge two objects intended to be passed to `db.query#findMany`. The
* `columns`, `with`, and `extras` properties are merged one level deep. The
* `where` property is merged using the `mergeRelationsFilter` function.
*
* **Arguments:**
* - The first argument must be an instance of `RelationalQueryBuilder`, which
* is used for type safety and auto-completion.
* - The other two arguments are the `DBQueryConfig` objects.
*/
function mergeFindManyArgs({ columns: leftColumns, extras: leftExtras, with: leftWith, where: leftWhere,...left }, { columns: rightColumns, extras: rightExtras, with: rightWith, where: rightWhere,...right }) {
	return {
		...left,
		...right,
		columns: mergeObjects(leftColumns, rightColumns),
		extras: mergeObjects(leftExtras, rightExtras),
		with: mergeObjects(leftWith, rightWith),
		where: mergeRelationsFilter(leftWhere, rightWhere)
	};
}
function mergeObjects(left, right) {
	return left && right ? {
		...left,
		...right
	} : left || right || void 0;
}

//#endregion
//#region src/syntax/caseWhen.ts
var SQLCaseWhen = class {
	cases;
	constructor(init) {
		this.cases = init ? [...init.cases] : [];
	}
	/**
	* Add a case to the case expression.
	*/
	when(whenExpr, thenExpr) {
		if (whenExpr) this.cases.push(sql`WHEN ${whenExpr} THEN ${thenExpr}`);
		return this;
	}
	/**
	* Add the else clause to the case expression.
	*/
	else(elseExpr) {
		if (this.cases.length) return sql`CASE ${sql.join(this.cases, sql.raw(" "))} ELSE ${elseExpr} END`;
		return sql`${elseExpr}`;
	}
	/**
	* Finish the case expression without an else clause, which will
	* return `null` if no case matches.
	*/
	elseNull() {
		if (this.cases.length) return sql`CASE ${sql.join(this.cases, sql.raw(" "))} END`;
		return sql`NULL`;
	}
};
function caseWhen(whenExpr, thenExpr) {
	return new SQLCaseWhen().when(whenExpr, thenExpr);
}

//#endregion
//#region src/syntax/nest.ts
/**
* Wrap a subquery with parentheses and decode the result.
*
* **Please note** that the subquery must have exactly one column.
*/
function nest(subquery) {
	if (subquery instanceof QueryPromise) {
		const builtQuery = buildRelationalQuery(subquery);
		if (builtQuery.selection.length === 1) {
			const { field } = builtQuery.selection[0];
			return sql`(${builtQuery.sql})`.mapWith((result) => {
				return getDecoder(field).mapFromDriverValue(result);
			});
		}
	} else {
		const { selectedFields } = subquery._;
		const keys = Object.keys(selectedFields);
		if (keys.length === 1) {
			const field = selectedFields[keys[0]];
			return sql`(${getSQL(subquery)})`.mapWith((result) => {
				return getDecoder(field).mapFromDriverValue(result);
			});
		}
	}
	throw new Error("Subquery must have exactly one column");
}

//#endregion
//#region src/syntax/toSQL.ts
/**
* Coerce a JavaScript value to a parameter binding, while `SQLWrapper`
* instances are passed through.
*
* @param value - The value to coerce.
* @returns A `SQLWrapper` instance.
*/
function toSQL(value) {
	return isSQLWrapper(value) ? value : sql`${value}`;
}

//#endregion
//#region src/functions/abs.ts
/**
* Returns the absolute value of a number.
*/
function abs(value) {
	return sql`abs(${value})`;
}

//#endregion
//#region src/functions/ceil.ts
/**
* Returns the smallest integer greater than or equal to a number.
*/
function ceil(value) {
	return sql`ceil(${value})`;
}

//#endregion
//#region src/functions/coalesce.ts
/**
* Returns the first non-null value in a list of arguments.
*/
function coalesce(...args) {
	return sql`coalesce(${sql.join(args.map(toSQL), sql`, `)})`;
}

//#endregion
//#region src/functions/concatWithSeparator.ts
/**
* Concatenates two or more strings with the given separator. Null values are
* skipped, except when the separator is null, in which case the result is null.
*/
function concatWithSeparator(...args) {
	return sql`concat_ws(${sql.join(args.map(toSQL), sql`, `)})`;
}

//#endregion
//#region src/sql/timestamp.ts
var SQLTimestamp = class extends SQL {
	toDate() {
		return new SQL(this.queryChunks).mapWith((value) => value !== null ? new Date(value) : value);
	}
};

//#endregion
//#region src/functions/currentDate.ts
/**
* Returns the current date, without any time component.
*
* **Note:** Check your dialect's documentation to know if the date is local or
* UTC.
*
* **Note 2:** There are no safeguards against inserting a date string into a
* column that expects a timestamp.
*
* @example
* ```ts
* import { currentDate } from 'drizzle-plus'
*
* const today = currentDate()
* // => SQLTimestamp<string>
*
* today.toDate()
* // => SQL<Date>
* ```
*/
function currentDate() {
	return new SQLTimestamp([new StringChunk("current_date")]);
}

//#endregion
//#region src/functions/currentTime.ts
/**
* Returns the current time, without any date component.
*
* **Note:** Check your dialect's documentation to know if the timestamp is
* local or UTC.
*/
function currentTime() {
	return sql.raw("current_time");
}

//#endregion
//#region src/functions/currentTimestamp.ts
/**
* Returns the current timestamp (both date and time).
*
* **Note:** Check your dialect's documentation to know if the timestamp is
* local or UTC.
*
* @example
* ```ts
* import { currentTimestamp } from 'drizzle-plus'
*
* const now = currentTimestamp()
* // => SQLTimestamp<string>
*
* now.toDate()
* // => SQL<Date>
* ```
*/
function currentTimestamp() {
	return new SQLTimestamp([new StringChunk("current_timestamp")]);
}

//#endregion
//#region src/functions/floor.ts
/**
* Returns the largest integer less than or equal to a number.
*/
function floor(value) {
	return sql`floor(${value})`;
}

//#endregion
//#region src/functions/length.ts
/**
* Returns the length of a string.
*/
function length(value) {
	return sql`length(${value})`;
}

//#endregion
//#region src/functions/lower.ts
/**
* Converts a string to lowercase.
*/
function lower(value) {
	return sql`lower(${value})`;
}

//#endregion
//#region src/functions/mod.ts
/**
* Returns the remainder of a division operation.
*/
function mod(dividend, divisor) {
	return sql`mod(${dividend}, ${divisor})`;
}

//#endregion
//#region src/functions/nullif.ts
/**
* Returns `NULL` if two expressions are equal, otherwise returns the first
* expression.
*/
function nullif(expression1, expression2) {
	return sql`nullif(${expression1}, ${expression2})`;
}

//#endregion
//#region src/functions/power.ts
/**
* Raises a number to the power of another.
*/
function power(base, exponent) {
	return sql`power(${base}, ${exponent})`;
}

//#endregion
//#region src/functions/round.ts
/**
* Rounds a numeric value to specified decimal places. By default, rounds to the
* nearest integer.
*/
function round(value, decimals) {
	return decimals !== void 0 ? sql`round(${value}, ${decimals})` : sql`round(${value})`;
}

//#endregion
//#region src/functions/sqrt.ts
/**
* Returns the square root of a number.
*/
function sqrt(value) {
	return sql`sqrt(${value})`;
}

//#endregion
//#region src/functions/substring.ts
/**
* Extracts a substring from a string. The start position is 1-based. If no
* length is specified, the substring extends to the end of the string.
*/
function substring(value, start, length$1) {
	return length$1 !== void 0 ? sql`substring(${value} from ${start} for ${length$1})` : sql`substring(${value} from ${start})`;
}

//#endregion
//#region src/functions/trim.ts
/**
* Removes leading and trailing spaces from a string.
*/
function trim(value) {
	return sql`trim(${value})`;
}

//#endregion
//#region src/functions/upper.ts
/**
* Converts a string to uppercase.
*/
function upper(value) {
	return sql`upper(${value})`;
}

//#endregion
export { SQLCaseWhen, SQLTimestamp, abs, caseWhen, ceil, coalesce, concatWithSeparator, currentDate, currentTime, currentTimestamp, floor, length, lower, mergeFindManyArgs, mergeRelationsFilter, mod, nest, nullif, power, round, sqrt, substring, toSQL, toSelection, trim, upper };