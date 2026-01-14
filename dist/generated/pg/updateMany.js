import { isFunction } from "../../radashi-MvYqL19z.js";
import { getContext, getFilterSQL, getReturningFields } from "../../internal-CfVT0bfO.js";
import { SQL, WithSubquery, getTableColumns, is, relationsOrderToSQL, sql } from "drizzle-orm";
import { PgSelectBase, PgUpdateBase } from "drizzle-orm/pg-core";
import { RelationalQueryBuilder } from "drizzle-orm/pg-core/query-builders/query";

//#region src/generated/adapters/pg.ts
function selectRowsToUpdateOrDelete(rqb, limit, where, orderBy) {
	const ctx = getContext(rqb);
	const selection = new PgSelectBase({
		fields: { ctid: sql.raw("ctid") },
		table: ctx.table,
		dialect: ctx.dialect,
		session: ctx.session,
		distinct: void 0,
		isPartialSelect: false,
		withList: []
	}).for("update").where(where && getFilterSQL(rqb, where)).limit(limit);
	if (orderBy && !is(orderBy, SQL)) orderBy = relationsOrderToSQL(ctx.table, orderBy);
	if (orderBy) selection.orderBy(orderBy);
	return [new WithSubquery(selection.getSQL(), selection.getSelectedFields(), "matched_rows", true)];
}
function innerJoinMatchedRows(table, query) {
	if (query instanceof PgUpdateBase) query.from(sql`matched_rows`).where(sql`${table}.ctid = matched_rows.ctid`);
	else throw new Error("Drizzle does not support joins in delete queries. See https://github.com/drizzle-team/drizzle-orm/issues/3100");
}
function setReturningClauseForUpdateOrDelete(query, returningOption, columns) {
	const returning = returningOption && getReturningFields(returningOption, columns);
	if (returning) query.returning(returning);
}

//#endregion
//#region src/generated/pg/updateMany.ts
RelationalQueryBuilder.prototype.updateMany = function(config) {
	const { table, dialect, session } = getContext(this);
	const columns = getTableColumns(table);
	const withList = config.limit !== void 0 ? selectRowsToUpdateOrDelete(this, config.limit, config.where, config.orderBy) : void 0;
	const query = new PgUpdateBase(table, isFunction(config.set) ? config.set(columns) : config.set, session, dialect, withList);
	if (config.limit !== void 0) innerJoinMatchedRows(table, query);
	else if (config.where) query.where(getFilterSQL(this, config.where));
	setReturningClauseForUpdateOrDelete(query, config.returning, columns);
	return query;
};

//#endregion