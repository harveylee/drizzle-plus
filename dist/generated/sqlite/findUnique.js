import "../../radashi-MvYqL19z.js";
import { getContext, getTargetColumns } from "../../internal-BoWleUyE.js";
import { getTableColumns } from "drizzle-orm";
import { RelationalQueryBuilder } from "drizzle-orm/sqlite-core/query-builders/query";

//#region src/generated/sqlite/findUnique.ts
RelationalQueryBuilder.prototype.findUnique = function(config) {
	const { table } = getContext(this);
	const columns = getTableColumns(table);
	const usedColumns = [];
	for (const key in config.where) if (key in columns) usedColumns.push(columns[key]);
	const target = getTargetColumns(table, usedColumns);
	if (!target) throw new Error("No matching primary key or unique constraint found");
	return this.findFirst(config);
};

//#endregion