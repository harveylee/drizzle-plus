import { mergeFindManyArgs } from "drizzle-plus";
import { RelationalQueryBuilder } from "drizzle-orm/mysql-core/query-builders/query";

//#region src/generated/mysql/$findMany.ts
RelationalQueryBuilder.prototype.$findMany = function(config1, config2) {
	return config2 ? mergeFindManyArgs(config1, config2) : config1;
};

//#endregion