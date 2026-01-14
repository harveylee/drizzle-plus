import { DrizzleError, sql } from "drizzle-orm";
import { PgSelectBuilder } from "drizzle-orm/pg-core";

//#region src/generated/pg/fromSingle.ts
PgSelectBuilder.prototype.fromSingle = function() {
	const { fields } = this;
	if (!fields) throw new DrizzleError({ message: "Selection is required" });
	return this.from(sql.raw("(select 1) as \"placeholder\""));
};

//#endregion