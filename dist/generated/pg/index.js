import { buildJsonProperties, createJsonArrayDecoder, createJsonObjectDecoder, getDecoder, mapSelectedFieldsToDecoders, orderSelectedFields } from "../../utils-Brc9vC7H.js";
import { concat } from "../../concat-_jeXZId5.js";
import "../../types-Cv8NMtbo.js";
import { DrizzleError, SQL, StringChunk, Subquery, getTableColumns, is, sql } from "drizzle-orm";
import { sql as sql$1 } from "drizzle-orm/sql";
import { SQLTimestamp, coalesce } from "drizzle-plus";
import { PgTable } from "drizzle-orm/pg-core";
import { PgViewBase } from "drizzle-orm/pg-core/view-base";

//#region src/generated/pg/cast.ts
/**
* Cast a value to a specific type.
*
* ⚠️ Never pass user input as the `type` argument unless you've thoroughly
* validated it.
*/
function cast(value, type) {
	return sql$1`cast(${value} as ${sql$1.raw(type)})`;
}

//#endregion
//#region src/generated/pg/jsonAgg.ts
/**
* Create a `jsonb_agg()` expression from a given value.
*/
function jsonAgg(value, options) {
	return sql`jsonb_agg(${value}${options?.orderBy && sql` order by ${options.orderBy}`})${options?.where && sql` filter (where ${options.where})`}`.mapWith(createJsonArrayDecoder(getDecoder(value)));
}
/**
* Create a `jsonb_agg()` expression that returns an empty array if the result
* set is empty, rather than `null`.
*/
function jsonAggNotNull(value, options) {
	return coalesce(jsonAgg(value, options), sql`'[]'::jsonb`);
}

//#endregion
//#region src/generated/pg/jsonBuildObject.ts
/**
* Build a JSON object from the selected fields of a given subquery. You may
* pass a plain object instead, in which case its values can be any valid SQL
* expression.
*/
function jsonBuildObject(subquery) {
	const decoders = /* @__PURE__ */ new Map();
	const properties = buildJsonProperties(subquery, decoders);
	return sql`jsonb_build_object(${properties})`.mapWith(createJsonObjectDecoder(decoders));
}

//#endregion
//#region src/generated/pg/position.ts
/**
* Performs a **case-sensitive** search for the first occurrence of a substring
* in a string. Returns the 1-based offset of the first occurrence of the
* substring in the string, or `0` if the substring is not found.
*/
function position(substring, string) {
	return sql`position(${substring} in ${string})`;
}

//#endregion
//#region src/generated/pg/rowToJson.ts
/**
* Convert a single row to a JSON object using PostgreSQL's `row_to_json`
* function.
*
* If the input is an empty result set, the output will be `null`. Notably, the
* `drizzle-plus` implementation doesn't include `null` in the return type, for
* convenience. You should wrap `rowToJson` calls with a `coalesce` or
* `caseWhen` call to handle the null case explicitly. If you're confident the
* result set cannot be empty, then you can skip this step.
*
* If the input is a result set of potentially multiple rows, you should use
* `jsonAgg(rowToJson(subquery))` instead. Otherwise, you'll get a database
* error when this happens.
*/
function rowToJson(subquery) {
	let fields;
	let decoder;
	if (is(subquery, PgTable)) fields = getTableColumns(subquery);
	else if (is(subquery, Subquery)) {
		if (!subquery._.alias) throw new DrizzleError({ message: "Subquery must have an alias." });
		fields = subquery._.selectedFields;
		subquery = new SQL([sql.identifier(subquery._.alias)]);
	} else if (is(subquery, PgViewBase)) fields = subquery._.selectedFields;
	if (fields) {
		const orderedFields = orderSelectedFields(fields);
		const decodedFields = mapSelectedFieldsToDecoders(orderedFields);
		decoder = { mapFromDriverValue(row) {
			if (row) for (const field in decodedFields) row[field] = decodedFields[field].mapFromDriverValue(row[field]);
			return row;
		} };
	} else decoder = getDecoder(subquery);
	return sql`row_to_json(${subquery})`.mapWith(decoder);
}

//#endregion
//#region src/generated/pg/uuidExtractTimestamp.ts
/**
* Extract the timestamp from a UUID v1 or v7.
*
* @returns a `SQLTimestamp` instance, which can be used in a raw SQL query.
*/
function uuidExtractTimestamp(uuid) {
	return new SQLTimestamp([
		new StringChunk("uuid_extract_timestamp("),
		uuid,
		new StringChunk(")")
	]);
}

//#endregion
//#region src/generated/pg/uuidv7.ts
/**
* Generate a version 7 (time-ordered) UUID. The timestamp is computed using
* UNIX timestamp with millisecond precision + sub-millisecond timestamp +
* random.
*
* @param shift - An interval to shift the UUID's timestamp by. (e.g. `'1 day'`)
*/
function uuidv7(shift) {
	return sql`uuidv7(${shift})`;
}

//#endregion
export { cast, concat, jsonAgg, jsonAggNotNull, jsonBuildObject, position, rowToJson, uuidExtractTimestamp, uuidv7 };