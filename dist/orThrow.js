import { DrizzleError } from "drizzle-orm";
import { QueryPromise } from "drizzle-orm/query-promise";

//#region src/orThrow.ts
QueryPromise.prototype.orThrow = function(message) {
	const execute = this.execute;
	this.execute = function() {
		return execute.call(this).then((result) => {
			if (Array.isArray(result) ? result.length === 0 : result == null) throw new DrizzleError({ message: message || "No rows returned" });
			return result;
		});
	};
	return this;
};

//#endregion
export { QueryPromise };