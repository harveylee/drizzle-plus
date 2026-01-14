import "../../radashi-MvYqL19z.js";
import "../../internal-CfVT0bfO.js";
import "../../count-yjpErfr-.js";
import { RelationalQueryBuilder } from "drizzle-orm/pg-core/query-builders/query";

//#region src/generated/pg/findManyAndCount.ts
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