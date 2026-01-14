import { toSelection } from "drizzle-plus";
import { PgDatabase } from "drizzle-orm/pg-core/db";

//#region src/generated/pg/$select.ts
PgDatabase.prototype.$select = (fields) => toSelection(fields, { addAliases: true });

//#endregion