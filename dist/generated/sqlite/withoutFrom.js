import { DrizzleError, sql } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { orderSelectedFields } from "drizzle-plus/utils";
import { SQLiteSelectBase, SQLiteSelectBuilder } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/withoutFrom.ts
var SQLiteSelectWithoutFrom = class extends TypedQueryBuilder {
	_;
	constructor(select, selectedFields) {
		super();
		this.config = {
			fields: { ...selectedFields },
			withList: select.withList
		};
		this.joinsNotNullableMap = {};
		this.session = select.session;
		this.dialect = select.dialect;
		this.usedTables = /* @__PURE__ */ new Set();
		this._ = { selectedFields };
	}
	getSQL() {
		const dialect = this.dialect;
		const orderedFields = orderSelectedFields(this._.selectedFields);
		const withSql = dialect.buildWithCTE(this.config.withList);
		return sql`${withSql}select ${dialect.buildSelection(orderedFields)}`;
	}
	execute(placeholderValues) {
		return this._prepare().execute(placeholderValues);
	}
};
Object.defineProperties(SQLiteSelectWithoutFrom.prototype, {
	...Object.getOwnPropertyDescriptors(SQLiteSelectBase.prototype),
	constructor: { value: SQLiteSelectWithoutFrom }
});
SQLiteSelectBuilder.prototype.withoutFrom = function() {
	const { fields } = this;
	if (!fields) throw new DrizzleError({ message: "Selection is required" });
	return new SQLiteSelectWithoutFrom(this, fields);
};

//#endregion
export { SQLiteSelectWithoutFrom };