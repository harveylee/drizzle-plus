import { getContext, getFilterSQL } from "./internal-uJGafNeM.js";
import { QueryPromise, aliasedTable, getTableAsAliasSQL, sql } from "drizzle-orm";
import { RelationalQueryBuilder } from "drizzle-orm/mysql-core/query-builders/query";

//#region src/generated/mysql/count.ts
RelationalQueryBuilder.prototype.count = function(filter) {
	const origTable = getContext(this).table;
	const aliased = Object.assign({}, this, { table: aliasedTable(origTable, "dp0") });
	const { table, dialect, session } = getContext(aliased);
	return new CountQueryPromise(table, filter && getFilterSQL(aliased, filter), session, dialect);
};
var CountQueryPromise = class extends QueryPromise {
	constructor(table, filter, session, dialect) {
		super();
		this.table = table;
		this.filter = filter;
		this.session = session;
		this.dialect = dialect;
	}
	async execute() {
		const query = this.getSQL();
		const [result] = await this.session.all(query);
		return Number(result.count);
	}
	toSQL() {
		return this.dialect.sqlToQuery(this.getSQL());
	}
	getSQL() {
		const query = sql`select count(*) AS "count" from ${getTableAsAliasSQL(this.table)}`;
		if (this.filter) query.append(sql` where ${this.filter}`);
		return query;
	}
	_getQuery() {
		return {
			sql: this.getSQL(),
			selection: [{
				key: "count",
				field: sql`count(*)`.mapWith(Number)
			}]
		};
	}
};

//#endregion
export { CountQueryPromise };