import { toSelection } from "drizzle-plus";
import { MySqlDatabase } from "drizzle-orm/mysql-core/db";

//#region src/generated/mysql/$select.ts
MySqlDatabase.prototype.$select = (fields) => toSelection(fields, { addAliases: true });

//#endregion