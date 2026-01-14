import "../../json-ZhdFcNhs.js";
import { InferSQLNull, SQLExpression, SQLResult, SQLValue } from "../../types-BIurY8o2.js";
import { jsonObject } from "../../jsonObject-BkjWkxm9.js";
import { concat } from "../../concat-DqGC1d_5.js";
import { InferCastResult, InferColumns, RawFieldsToSubquery, RelationalQueryBuilder, SQLType, SQLTypeToJS } from "../../types-C7MXseDR.js";
import { DrizzleTypeError, SQL } from "drizzle-orm";
import { SQL as SQL$1 } from "drizzle-orm/sql";

//#region src/generated/sqlite/cast.d.ts
/**
 * Cast a value to a specific type.
 *
 * ⚠️ Never pass user input as the `type` argument unless you've thoroughly
 * validated it.
 */
declare function cast<const T extends SQLType | (string & {})>(value: unknown, type: (T | SQLType) & (string extends NoInfer<T> ? DrizzleTypeError<'DANGER: Do not pass user input as the type argument of the cast() function.'> : unknown)): SQL$1<InferCastResult<T>>;
//#endregion
//#region src/generated/sqlite/instr.d.ts
/**
 * Performs a **case-sensitive** search for the first occurrence of a substring
 * in a string.
 *
 * @param string - The string to search in.
 * @param substring - The substring to search for.
 * @returns The 1-based offset of the first occurrence of the substring in the
 * string, or `0` if the substring is not found.
 */
declare function instr<TString extends SQLValue<string | null>, TSubstring extends SQLValue<string | null>>(string: TString, substring: TSubstring): SQL<number | InferSQLNull<TString | TSubstring>>;
//#endregion
//#region src/generated/sqlite/jsonGroupArray.d.ts
/**
 * Create a `json_group_array()` expression from a given value.
 */
declare function jsonGroupArray<T extends SQLExpression>(value: T): SQL<SQLResult<T>[]>;
//#endregion
export { InferCastResult, InferColumns, RawFieldsToSubquery, RelationalQueryBuilder, SQLType, SQLTypeToJS, cast, concat, instr, jsonGroupArray, jsonObject };