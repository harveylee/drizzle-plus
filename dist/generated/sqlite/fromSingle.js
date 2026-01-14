import { DrizzleError, sql } from "drizzle-orm";
import { SQLiteSelectBuilder } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/fromSingle.ts
SQLiteSelectBuilder.prototype.fromSingle = function() {
	const { fields } = this;
	if (!fields) throw new DrizzleError({ message: "Selection is required" });
	return this.from(sql.raw("(select 1) as \"placeholder\""));
};

//#endregion