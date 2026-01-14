import { getTableColumns } from "drizzle-orm";
import { MySqlTable } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/$without.ts
MySqlTable.prototype.$without = function(...fields) {
	const columns = { ...getTableColumns(this) };
	for (const field of fields) delete columns[field];
	return columns;
};

//#endregion