import "../../json-yDXowxm9.js";
import { AnySelectQuery, InferSQLNull, RowToJson, SQLExpression, SQLResult, SQLValue, ToJsonObject } from "../../types-BGX1maf_.js";
import { InferCastResult, InferColumns, RawFieldsToSubquery, RelationalQueryBuilder, SQLType, SQLTypeToJS } from "../../types-C2OQJKXX.js";
import { concat } from "../../concat-Rb4eECu0.js";
import { DrizzleTypeError, SQL, SQLWrapper, Subquery, Table, View } from "drizzle-orm";
import { SQL as SQL$1 } from "drizzle-orm/sql";
import { SQLTimestamp } from "drizzle-plus";

//#region src/generated/pg/cast.d.ts

/**
 * Cast a value to a specific type.
 *
 * ⚠️ Never pass user input as the `type` argument unless you've thoroughly
 * validated it.
 */
declare function cast<const TData, const TDataType extends SQLType | (string & {})>(value: SQLValue<TData>, type: (TDataType | SQLType) & (string extends NoInfer<TDataType> ? DrizzleTypeError<'DANGER: Do not pass user input as the type argument of the cast() function.'> : unknown)): InferCastResult<TDataType> extends infer TResult ? SQL$1<TData extends null ? null : TData extends TResult ? TData : TResult> : never;
//#endregion
//#region src/generated/pg/jsonAgg.d.ts
type JsonAggOptions = {
  orderBy?: SQLExpression;
  where?: SQL;
};
/**
 * Create a `jsonb_agg()` expression from a given value.
 */
declare function jsonAgg<T extends SQLExpression>(value: T, options?: JsonAggOptions): SQL<SQLResult<T>[] | null>;
/**
 * Create a `jsonb_agg()` expression that returns an empty array if the result
 * set is empty, rather than `null`.
 */
declare function jsonAggNotNull<T extends SQLExpression>(value: T, options?: JsonAggOptions): SQL<SQLResult<T>[]>;
//#endregion
//#region src/generated/pg/jsonBuildObject.d.ts
/**
 * Build a JSON object from the selected fields of a given subquery. You may
 * pass a plain object instead, in which case its values can be any valid SQL
 * expression.
 */
declare function jsonBuildObject<T extends AnySelectQuery | Record<string, unknown>>(subquery: T): ToJsonObject<T>;
//#endregion
//#region src/generated/pg/position.d.ts
/**
 * Performs a **case-sensitive** search for the first occurrence of a substring
 * in a string. Returns the 1-based offset of the first occurrence of the
 * substring in the string, or `0` if the substring is not found.
 */
declare function position<TSubstring extends SQLValue<string | null>, TString extends SQLValue<string | null>>(substring: TSubstring, string: TString): SQL<number | InferSQLNull<TSubstring | TString>>;
//#endregion
//#region src/generated/pg/rowToJson.d.ts
/**
 * Convert a single row to a JSON object using PostgreSQL's `row_to_json`
 * function.
 *
 * If the input is an empty result set, the output will be `null`. Notably, the
 * `drizzle-plus` implementation doesn't include `null` in the return type, for
 * convenience. You should wrap `rowToJson` calls with a `coalesce` or
 * `caseWhen` call to handle the null case explicitly. If you're confident the
 * result set cannot be empty, then you can skip this step.
 *
 * If the input is a result set of potentially multiple rows, you should use
 * `jsonAgg(rowToJson(subquery))` instead. Otherwise, you'll get a database
 * error when this happens.
 */
declare function rowToJson<T extends Subquery | Table | View | SQLWrapper>(subquery: T | SQLWrapper): SQL<RowToJson<T>>;
//#endregion
//#region src/generated/pg/uuidExtractTimestamp.d.ts
/**
 * Extract the timestamp from a UUID v1 or v7.
 *
 * @returns a `SQLTimestamp` instance, which can be used in a raw SQL query.
 */
declare function uuidExtractTimestamp<T extends SQLValue<string | null>>(uuid: T): SQLTimestamp<string | InferSQLNull<T>>;
//#endregion
//#region src/generated/pg/uuidv7.d.ts
/**
 * Generate a version 7 (time-ordered) UUID. The timestamp is computed using
 * UNIX timestamp with millisecond precision + sub-millisecond timestamp +
 * random.
 *
 * @param shift - An interval to shift the UUID's timestamp by. (e.g. `'1 day'`)
 */
declare function uuidv7(shift?: SQLValue<string>): SQL<string>;
//#endregion
export { InferCastResult, InferColumns, JsonAggOptions, RawFieldsToSubquery, RelationalQueryBuilder, SQLType, SQLTypeToJS, cast, concat, jsonAgg, jsonAggNotNull, jsonBuildObject, position, rowToJson, uuidExtractTimestamp, uuidv7 };