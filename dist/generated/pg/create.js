import "../../utils-Brc9vC7H.js";
import { getContext, getReturningFields } from "../../internal-CCS5c49v.js";
import { getTableColumns } from "drizzle-orm";
import { PgInsertBase } from "drizzle-orm/pg-core";
import { RelationalQueryBuilder } from "drizzle-orm/pg-core/query-builders/query";

//#region src/generated/pg/create.ts
RelationalQueryBuilder.prototype.create = function(config) {
	const { table, dialect, session } = getContext(this);
	const columns = getTableColumns(table);
	const query = new PgInsertBase(table, config.data, session, dialect);
	if (config.skipDuplicates) query.onConflictDoNothing();
	const returning = getReturningFields(config.returning, columns);
	if (returning) query.returning(returning);
	return query;
};

//#endregion