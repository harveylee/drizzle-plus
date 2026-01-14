import { toSelection } from "drizzle-plus";
import { BaseSQLiteDatabase } from "drizzle-orm/sqlite-core/db";

//#region src/generated/sqlite/$select.ts
BaseSQLiteDatabase.prototype.$select = (fields) => toSelection(fields, { addAliases: true });

//#endregion