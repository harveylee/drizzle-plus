import "../../utils-Brc9vC7H.js";
import { injectWithSubqueryAddons } from "../../internal-CCS5c49v.js";
import { PgDatabase } from "drizzle-orm/pg-core";

//#region src/generated/pg/$withMaterialized.ts
PgDatabase.prototype.$withMaterialized = function(alias, selection) {
	return injectWithSubqueryAddons(this.$with(alias, selection), { materialized: true });
};
PgDatabase.prototype.$withNotMaterialized = function(alias, selection) {
	return injectWithSubqueryAddons(this.$with(alias, selection), { materialized: false });
};

//#endregion