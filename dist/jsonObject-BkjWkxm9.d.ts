import { AnySelectQuery, ToJsonObject } from "./types-BIurY8o2.js";

//#region src/generated/mysql/jsonObject.d.ts

/**
 * Build a JSON object from the selected fields of a given subquery. You may
 * pass a plain object instead, in which case its values can be any valid SQL
 * expression.
 */
declare function jsonObject<T extends AnySelectQuery | Record<string, unknown>>(subquery: T): ToJsonObject<T>;
//#endregion
export { jsonObject };