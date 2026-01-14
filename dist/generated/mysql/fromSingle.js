import { DrizzleError, sql } from "drizzle-orm";
import { MySqlSelectBuilder } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/fromSingle.ts
MySqlSelectBuilder.prototype.fromSingle = function() {
	const { fields } = this;
	if (!fields) throw new DrizzleError({ message: "Selection is required" });
	return this.from(sql.raw("(select 1) as \"placeholder\""));
};

//#endregion