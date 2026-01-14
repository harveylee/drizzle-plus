import { RelationalQueryBuilder } from "drizzle-orm/mysql-core/query-builders/query";

//#region src/generated/mysql/$cursor.ts
RelationalQueryBuilder.prototype.$cursor = function(orderBy, cursor) {
	if (!cursor) return {
		where: void 0,
		orderBy
	};
	const where = {};
	Object.keys(orderBy).filter((key) => orderBy[key] !== void 0).forEach((column, index, columns) => {
		const value = cursor[column];
		const comparator = index < columns.length - 1 ? orderBy[column] === "asc" ? "gte" : "lte" : orderBy[column] === "asc" ? "gt" : "lt";
		where[column] = { [comparator]: value !== void 0 ? value : null };
	});
	return {
		where,
		orderBy
	};
};

//#endregion