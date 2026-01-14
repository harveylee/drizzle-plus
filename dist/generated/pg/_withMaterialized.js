import "../../radashi-MvYqL19z.js";
import { injectWithSubqueryAddons } from "../../internal-CfVT0bfO.js";
import { PgDatabase } from "drizzle-orm/pg-core";

//#region src/generated/pg/$withMaterialized.ts
PgDatabase.prototype.$withMaterialized = function(alias, selection) {
	return injectWithSubqueryAddons(this.$with(alias, selection), { materialized: true });
};
PgDatabase.prototype.$withNotMaterialized = function(alias, selection) {
	return injectWithSubqueryAddons(this.$with(alias, selection), { materialized: false });
};

//#endregion