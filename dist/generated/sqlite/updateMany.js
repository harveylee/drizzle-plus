import { isFunction } from "../../utils-Brc9vC7H.js";
import { getContext, getFilterSQL, getReturningFields } from "../../internal-DHpwsx2N.js";
import { SQL, getTableColumns, is, relationsOrderToSQL } from "drizzle-orm";
import { RelationalQueryBuilder } from "drizzle-orm/sqlite-core/query-builders/query";
import { SQLiteUpdateBase } from "drizzle-orm/sqlite-core";

//#region src/generated/adapters/sqlite.ts
function limitUpdateOrDelete(table, query, limit, orderBy) {
	if (limit !== void 0) query.limit(limit);
	if (orderBy && !is(orderBy, SQL)) orderBy = relationsOrderToSQL(table, orderBy);
	if (orderBy) query.orderBy(orderBy);
}
function setReturningClauseForUpdateOrDelete(query, returningOption, columns) {
	const returning = returningOption && getReturningFields(returningOption, columns);
	if (returning) query.returning(returning);
}

//#endregion
//#region src/generated/sqlite/updateMany.ts
RelationalQueryBuilder.prototype.updateMany = function(config) {
	const { table, dialect, session } = getContext(this);
	const columns = getTableColumns(table);
	const withList = void 0;
	const query = new SQLiteUpdateBase(table, isFunction(config.set) ? config.set(columns) : config.set, session, dialect, withList);
	if (config.where) query.where(getFilterSQL(this, config.where));
	if (config.limit !== void 0) limitUpdateOrDelete(table, query, config.limit, config.orderBy);
	setReturningClauseForUpdateOrDelete(query, config.returning, columns);
	return query;
};

//#endregion