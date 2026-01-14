import "../../utils-Brc9vC7H.js";
import { getContext, getReturningFields } from "../../internal-DHpwsx2N.js";
import { getTableColumns } from "drizzle-orm";
import { RelationalQueryBuilder } from "drizzle-orm/sqlite-core/query-builders/query";
import { SQLiteInsertBase } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/create.ts
RelationalQueryBuilder.prototype.create = function(config) {
	const { table, dialect, session } = getContext(this);
	const columns = getTableColumns(table);
	const query = new SQLiteInsertBase(table, config.data, session, dialect);
	if (config.skipDuplicates) query.onConflictDoNothing();
	const returning = getReturningFields(config.returning, columns);
	if (returning) query.returning(returning);
	return query;
};

//#endregion