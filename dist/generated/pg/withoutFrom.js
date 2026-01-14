import { orderSelectedFields } from "../../utils-Brc9vC7H.js";
import { DrizzleError, sql } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { PgSelectBase, PgSelectBuilder } from "drizzle-orm/pg-core";

//#region src/generated/pg/withoutFrom.ts
var PgSelectWithoutFrom = class extends TypedQueryBuilder {
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
Object.defineProperties(PgSelectWithoutFrom.prototype, {
	...Object.getOwnPropertyDescriptors(PgSelectBase.prototype),
	constructor: { value: PgSelectWithoutFrom }
});
PgSelectBuilder.prototype.withoutFrom = function() {
	const { fields } = this;
	if (!fields) throw new DrizzleError({ message: "Selection is required" });
	return new PgSelectWithoutFrom(this, fields);
};

//#endregion
export { PgSelectWithoutFrom };