import { getTableColumns } from "drizzle-orm";
import { SQLiteTable } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/$without.ts
SQLiteTable.prototype.$without = function(...fields) {
	const columns = { ...getTableColumns(this) };
	for (const field of fields) delete columns[field];
	return columns;
};

//#endregion