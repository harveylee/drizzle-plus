import "../../radashi-MvYqL19z.js";
import "../../internal-BoWleUyE.js";
import "../../count-Do7DWDWx.js";
import { RelationalQueryBuilder } from "drizzle-orm/sqlite-core/query-builders/query";

//#region src/generated/sqlite/findManyAndCount.ts
RelationalQueryBuilder.prototype.findManyAndCount = function(config) {
	const findManyPromise = this.findMany(config);
	const countQuery = this.count(config?.where);
	return {
		then(onfulfilled, onrejected) {
			return Promise.all([findManyPromise, countQuery]).then(([data, count]) => ({
				data,
				count
			})).then(onfulfilled, onrejected);
		},
		toSQL: () => ({
			findMany: findManyPromise.toSQL(),
			count: countQuery.toSQL()
		})
	};
};

//#endregion