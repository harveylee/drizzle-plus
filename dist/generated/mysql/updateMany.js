import { isFunction } from "../../utils-Brc9vC7H.js";
import { getContext, getFilterSQL } from "../../internal-uJGafNeM.js";
import { SQL, getTableColumns, is, relationsOrderToSQL } from "drizzle-orm";
import { RelationalQueryBuilder } from "drizzle-orm/mysql-core/query-builders/query";
import { MySqlUpdateBase } from "drizzle-orm/mysql-core";

//#region src/generated/adapters/mysql.ts
function limitUpdateOrDelete(table, query, limit, orderBy) {
	if (limit !== void 0) query.limit(limit);
	if (orderBy && !is(orderBy, SQL)) orderBy = relationsOrderToSQL(table, orderBy);
	if (orderBy) query.orderBy(orderBy);
}

//#endregion
//#region src/generated/mysql/updateMany.ts
RelationalQueryBuilder.prototype.updateMany = function(config) {
	const { table, dialect, session } = getContext(this);
	const columns = getTableColumns(table);
	const withList = void 0;
	const query = new MySqlUpdateBase(table, isFunction(config.set) ? config.set(columns) : config.set, session, dialect, withList);
	if (config.where) query.where(getFilterSQL(this, config.where));
	if (config.limit !== void 0) limitUpdateOrDelete(table, query, config.limit, config.orderBy);
	return query;
};

//#endregion