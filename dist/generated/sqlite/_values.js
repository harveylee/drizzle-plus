import "../../radashi-MvYqL19z.js";
import { createWithSubquery, setWithSubqueryAddons } from "../../internal-BoWleUyE.js";
import { DrizzleError, SQL, Subquery, getTableColumns, is } from "drizzle-orm";
import { noopDecoder as noopDecoder$1, sql as sql$1 } from "drizzle-orm/sql";
import { pushStringChunk } from "drizzle-plus/utils";
import { BaseSQLiteDatabase, SQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/$values.ts
/**
* Produces a SQL `values` list of one or more rows.
*
* The given array may contain tuples or objects. Each tuple/object **must have
* the exact same keys** as the first row in the array, or unexpected behavior
* may occur.
*
* @example
* ```ts
* db.select().from(db.$values([{ a: 1 }, { a: 2 }]).as('my_values'))
* ```
*/
BaseSQLiteDatabase.prototype.$values = function(rows, typings) {
	if (!rows.length) throw new DrizzleError({ message: "No rows provided" });
	const casing = this.dialect.casing;
	return new ValuesList(casing, Object.keys(rows[0]), rows, typings);
};
BaseSQLiteDatabase.prototype.$withValues = function(alias, rows, typings) {
	const withSubquery = createWithSubquery(this.$values(rows, typings).getSQL(), alias, new Proxy(rows[0], { get: (_, key) => is(typings, SQLiteTable) && getTableColumns(typings)[key] || noopDecoder$1 }));
	return setWithSubqueryAddons(withSubquery, { columns: Object.keys(rows[0]) });
};
var ValuesList = class {
	shouldInlineParams = false;
	typings;
	constructor(casing, keys, rows, typings) {
		this.casing = casing;
		this.keys = keys;
		this.rows = rows;
		this.typings = typings && (is(typings, SQLiteTable) ? getTableColumns(typings) : typings);
	}
	as(alias) {
		const columnList = this.keys.map((key) => this.casing.convert(key));
		const selectedFields = {};
		this.keys.forEach((key, index) => {
			const field = selectedFields[key] = sql$1`${sql$1.identifier(alias)}.${sql$1.identifier(columnList[index])}`;
			const type = this.typings?.[key];
			if (is(type, SQLiteColumn)) field.mapWith(type);
		});
		return new Proxy(new Subquery(this.getSQL(), selectedFields, alias, false, [], columnList), { get: (target, key) => {
			if (key in selectedFields) return selectedFields[key];
			return target[key];
		} });
	}
	getSQL() {
		const chunks = [];
		pushStringChunk(chunks, "values ");
		for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
			pushStringChunk(chunks, "(");
			let row = this.rows[rowIndex];
			this.keys.forEach((key, keyIndex) => {
				let value = row[key];
				if (value === void 0) throw new DrizzleError({ message: "Undefined values are not allowed in a ValuesList." });
				if (rowIndex === 0) {
					let type = this.typings?.[key];
					if (type) value = sql$1`cast(${value} as ${sql$1.raw(is(type, SQLiteColumn) ? type.getSQLType() : type)})`;
				}
				chunks.push(value);
				if (keyIndex < this.keys.length - 1) pushStringChunk(chunks, ", ");
			});
			pushStringChunk(chunks, ")");
			if (rowIndex < this.rows.length - 1) pushStringChunk(chunks, ", ");
		}
		const query = new SQL(chunks);
		return this.shouldInlineParams ? query.inlineParams() : query;
	}
	inlineParams() {
		this.shouldInlineParams = true;
		return this;
	}
};

//#endregion
export { ValuesList };