import { getTableColumns } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

//#region src/generated/pg/$without.ts
PgTable.prototype.$without = function(...fields) {
	const columns = { ...getTableColumns(this) };
	for (const field of fields) delete columns[field];
	return columns;
};

//#endregion