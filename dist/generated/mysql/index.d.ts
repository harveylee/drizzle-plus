import "../../json-yDXowxm9.js";
import { InferSQLNull, SQLExpression, SQLResult, SQLValue } from "../../types-BGX1maf_.js";
import { InferCastResult, InferColumns, RawFieldsToSubquery, RelationalQueryBuilder, SQLType, SQLTypeToJS } from "../../types-Cvre74mP.js";
import { jsonObject } from "../../jsonObject-BUAxYna7.js";
import { DrizzleTypeError, SQL } from "drizzle-orm";
import { SQL as SQL$1 } from "drizzle-orm/sql";

//#region src/generated/mysql/cast.d.ts

/**
 * Cast a value to a specific type.
 *
 * ⚠️ Never pass user input as the `type` argument unless you've thoroughly
 * validated it.
 */
declare function cast<const T extends SQLType | (string & {})>(value: unknown, type: (T | SQLType) & (string extends NoInfer<T> ? DrizzleTypeError<'DANGER: Do not pass user input as the type argument of the cast() function.'> : unknown)): SQL$1<InferCastResult<T>>;
//#endregion
//#region src/generated/mysql/concat.d.ts
/**
 * Concatenates two or more strings. If one of the arguments is null, the result
 * is null.
 *
 * @param args - The strings to concatenate.
 * @returns The concatenated string.
 */
declare function concat<T extends SQLValue<string | null>[]>(...args: T): SQL<string | InferSQLNull<T[number]>>;
//#endregion
//#region src/generated/mysql/jsonArrayAgg.d.ts
/**
 * Create a `json_arrayagg()` expression from a given value.
 */
declare function jsonArrayAgg<T extends SQLExpression>(value: T): SQL<SQLResult<T>[]>;
//#endregion
//#region src/generated/mysql/position.d.ts
/**
 * Performs a **case-insensitive** search for the first occurrence of a
 * substring in a string.
 *
 * @param substring - The substring to search for.
 * @param string - The string to search in.
 * @returns The 1-based offset of the first occurrence of the substring in the
 * string, or `0` if the substring is not found.
 */
declare function position<TSubstring extends SQLValue<string | null>, TString extends SQLValue<string | null>>(substring: TSubstring, string: TString): SQL<number | InferSQLNull<TSubstring | TString>>;
//#endregion
export { InferCastResult, InferColumns, RawFieldsToSubquery, RelationalQueryBuilder, SQLType, SQLTypeToJS, cast, concat, jsonArrayAgg, jsonObject, position };