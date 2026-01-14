import "./json-yDXowxm9.js";
import { AnyDBQueryConfig, AnyQuery, InferSQLNull, QueryToSQL, RawFieldsToSelection, SQLExpression, SQLResult, SQLValue } from "./types-BGX1maf_.js";
import * as drizzle_orm9 from "drizzle-orm";
import { SQL, SQLWrapper } from "drizzle-orm";
import { Simplify } from "radashi";

//#region src/mergeRelationsFilter.d.ts
type MergedOperators = {
  OR?: object[];
  AND?: object[];
  NOT?: object;
  RAW?: SQLWrapper | ((table: any, operators: any) => SQL);
};
type MergeRelationsFilter<TLeft extends MergedOperators | undefined, TRight extends MergedOperators | undefined> = Exclude<TLeft, undefined> | TRight;
/**
 * Merge two `where` filters for Drizzle's RelationalQueryBuilder API.
 */
declare function mergeRelationsFilter<TLeft extends MergedOperators, TRight extends MergedOperators | undefined>(left: TLeft | undefined, right: TRight): MergeRelationsFilter<TLeft, TRight>;
//#endregion
//#region src/mergeFindManyArgs.d.ts
type MergeFindManyArgs<TLeft extends AnyDBQueryConfig, TRight extends AnyDBQueryConfig> = Simplify<{
  limit: MergeProperty<TLeft, TRight, 'limit'>;
  offset: MergeProperty<TLeft, TRight, 'offset'>;
  orderBy: MergeProperty<TLeft, TRight, 'orderBy'>;
  columns: MergeObjects<TLeft['columns'], TRight['columns']>;
  extras: MergeObjects<TLeft['extras'], TRight['extras']>;
  with: MergeObjects<TLeft['with'], TRight['with']>;
  where: MergeRelationsFilter<TLeft['where'], TRight['where']>;
}>;
/**
 * Merge two objects intended to be passed to `db.query#findMany`. The
 * `columns`, `with`, and `extras` properties are merged one level deep. The
 * `where` property is merged using the `mergeRelationsFilter` function.
 *
 * **Arguments:**
 * - The first argument must be an instance of `RelationalQueryBuilder`, which
 * is used for type safety and auto-completion.
 * - The other two arguments are the `DBQueryConfig` objects.
 */
declare function mergeFindManyArgs<const TLeft extends AnyDBQueryConfig, const TRight extends AnyDBQueryConfig>({
  columns: leftColumns,
  extras: leftExtras,
  with: leftWith,
  where: leftWhere,
  ...left
}: TLeft, {
  columns: rightColumns,
  extras: rightExtras,
  with: rightWith,
  where: rightWhere,
  ...right
}: TRight): MergeFindManyArgs<TLeft, TRight>;
type MergeObjects<TLeft, TRight> = TLeft extends object ? TRight extends object ? { [K in keyof TLeft | keyof TRight]: MergeProperty<TLeft, TRight, K> } : TLeft : TRight extends object ? TRight : undefined;
type MergeProperty<TLeft, TRight, Key extends keyof TLeft | keyof TRight> = Key extends keyof TLeft ? Key extends keyof TRight ? Omit<TRight, Key> extends TRight ? TLeft[Key] | Exclude<TRight[Key], undefined> : TRight[Key] : TLeft[Key] : Key extends keyof TRight ? TRight[Key] : never;
//#endregion
//#region src/syntax/caseWhen.d.ts
declare class SQLCaseWhen<T = never> {
  cases: SQL<T>[];
  constructor(init?: SQLCaseWhen<T>);
  /**
   * Add a case to the case expression.
   */
  when<Then>(whenExpr: SQLExpression | undefined, thenExpr: SQLValue<Then>): SQLCaseWhen<T | Then>;
  /**
   * Add the else clause to the case expression.
   */
  else<Else>(elseExpr: SQLValue<Else>): SQL<T | Else>;
  /**
   * Finish the case expression without an else clause, which will
   * return `null` if no case matches.
   */
  elseNull(): SQL<T | null>;
}
declare function caseWhen<Then>(whenExpr: SQLExpression | undefined, thenExpr: SQLValue<Then>): SQLCaseWhen<Then>;
//#endregion
//#region src/syntax/nest.d.ts
/**
 * Wrap a subquery with parentheses and decode the result.
 *
 * **Please note** that the subquery must have exactly one column.
 */
declare function nest<T extends AnyQuery>(subquery: T): QueryToSQL<T, {
  scalar: true;
}>;
//#endregion
//#region src/syntax/toSelection.d.ts
/**
 * Coerce a plain object with JavaScript values to a `db.select()` selection
 * object. Any objects within must be JSON-serializable.
 *
 * - `undefined` values are ignored
 * - primitive values (including `null`) are wrapped with `sql` template
 * - `Date` values are treated as ISO strings
 * - subqueries and `SQL` objects are preserved
 */
declare function toSelection<T extends Record<string, unknown>>(fields: T, options?: {
  addAliases?: boolean;
}): RawFieldsToSelection<T>;
//#endregion
//#region src/syntax/toSQL.d.ts
type ToSQL<T> = T extends SQLWrapper ? T : T extends number | boolean | null ? SQL<T> : SQL<string>;
/**
 * Coerce a JavaScript value to a parameter binding, while `SQLWrapper`
 * instances are passed through.
 *
 * @param value - The value to coerce.
 * @returns A `SQLWrapper` instance.
 */
declare function toSQL<T>(value: T): ToSQL<T>;
//#endregion
//#region src/functions/abs.d.ts
/**
 * Returns the absolute value of a number.
 */
declare function abs<T extends SQLExpression<number | null>>(value: T): drizzle_orm9.SQL<SQLResult<T>>;
//#endregion
//#region src/functions/ceil.d.ts
/**
 * Returns the smallest integer greater than or equal to a number.
 */
declare function ceil<T extends SQLExpression<number | null>>(value: T): drizzle_orm9.SQL<SQLResult<T>>;
//#endregion
//#region src/functions/coalesce.d.ts
/**
 * Returns the first non-null value in a list of arguments.
 */
declare function coalesce<T extends unknown[], U>(...args: [...T, U]): SQL<SQLResult<T[number] | U> | InferSQLNull<U>>;
//#endregion
//#region src/functions/concatWithSeparator.d.ts
/**
 * Concatenates two or more strings with the given separator. Null values are
 * skipped, except when the separator is null, in which case the result is null.
 */
declare function concatWithSeparator<TSeparator extends SQLValue<string | null>>(...args: [separator: TSeparator, ...SQLValue<string | null>[]]): SQL<string | InferSQLNull<TSeparator>>;
//#endregion
//#region src/sql/timestamp.d.ts
declare class SQLTimestamp<T extends string | null> extends SQL<T> {
  toDate(): SQL<Date | Extract<T, null>>;
}
//#endregion
//#region src/functions/currentDate.d.ts
/**
 * Returns the current date, without any time component.
 *
 * **Note:** Check your dialect's documentation to know if the date is local or
 * UTC.
 *
 * **Note 2:** There are no safeguards against inserting a date string into a
 * column that expects a timestamp.
 *
 * @example
 * ```ts
 * import { currentDate } from 'drizzle-plus'
 *
 * const today = currentDate()
 * // => SQLTimestamp<string>
 *
 * today.toDate()
 * // => SQL<Date>
 * ```
 */
declare function currentDate(): SQLTimestamp<string>;
//#endregion
//#region src/functions/currentTime.d.ts
/**
 * Returns the current time, without any date component.
 *
 * **Note:** Check your dialect's documentation to know if the timestamp is
 * local or UTC.
 */
declare function currentTime(): SQL<string>;
//#endregion
//#region src/functions/currentTimestamp.d.ts
/**
 * Returns the current timestamp (both date and time).
 *
 * **Note:** Check your dialect's documentation to know if the timestamp is
 * local or UTC.
 *
 * @example
 * ```ts
 * import { currentTimestamp } from 'drizzle-plus'
 *
 * const now = currentTimestamp()
 * // => SQLTimestamp<string>
 *
 * now.toDate()
 * // => SQL<Date>
 * ```
 */
declare function currentTimestamp(): SQLTimestamp<string>;
//#endregion
//#region src/functions/floor.d.ts
/**
 * Returns the largest integer less than or equal to a number.
 */
declare function floor<T extends SQLExpression<number | null>>(value: T): drizzle_orm9.SQL<SQLResult<T>>;
//#endregion
//#region src/functions/length.d.ts
/**
 * Returns the length of a string.
 */
declare function length<T extends SQLExpression<string | null>>(value: T): drizzle_orm9.SQL<number | InferSQLNull<T>>;
//#endregion
//#region src/functions/lower.d.ts
type LowercaseOrNull<T extends string | null> = T extends string ? Lowercase<T> : null;
/**
 * Converts a string to lowercase.
 */
declare function lower<T extends SQLExpression<string | null>>(value: T): SQL<LowercaseOrNull<SQLResult<T>>>;
//#endregion
//#region src/functions/mod.d.ts
/**
 * Returns the remainder of a division operation.
 */
declare function mod<TDividend extends SQLValue<number | null>, TDivisor extends SQLValue<number | null>>(dividend: TDividend, divisor: TDivisor): SQL<number | InferSQLNull<TDividend | TDivisor>>;
//#endregion
//#region src/functions/nullif.d.ts
/**
 * Returns `NULL` if two expressions are equal, otherwise returns the first
 * expression.
 */
declare function nullif<T extends SQLValue<unknown>>(expression1: T, expression2: unknown): drizzle_orm9.SQL<SQLResult<T>>;
//#endregion
//#region src/functions/power.d.ts
/**
 * Raises a number to the power of another.
 */
declare function power<TBase extends SQLValue<number | null>, TExponent extends SQLValue<number | null>>(base: TBase, exponent: TExponent): SQL<number | InferSQLNull<TBase | TExponent>>;
//#endregion
//#region src/functions/round.d.ts
/**
 * Rounds a numeric value to specified decimal places. By default, rounds to the
 * nearest integer.
 */
declare function round<TValue extends SQLValue<number | null>, TDecimals extends SQLValue<number | null>>(value: TValue, decimals?: TDecimals): SQL<number | InferSQLNull<TValue | TDecimals>>;
//#endregion
//#region src/functions/sqrt.d.ts
/**
 * Returns the square root of a number.
 */
declare function sqrt<T extends SQLExpression<number | null>>(value: T): drizzle_orm9.SQL<SQLResult<T>>;
//#endregion
//#region src/functions/substring.d.ts
/**
 * Extracts a substring from a string. The start position is 1-based. If no
 * length is specified, the substring extends to the end of the string.
 */
declare function substring<TInput extends SQLValue<string | null>, TPosition extends SQLValue<number | null>>(value: TInput, start: TPosition, length?: TPosition): SQL<string | InferSQLNull<TInput | TPosition>>;
//#endregion
//#region src/functions/trim.d.ts
/**
 * Removes leading and trailing spaces from a string.
 */
declare function trim<T extends SQLExpression<string | null>>(value: T): drizzle_orm9.SQL<SQLResult<T>>;
//#endregion
//#region src/functions/upper.d.ts
type UppercaseOrNull<T extends string | null> = T extends string ? Uppercase<T> : null;
/**
 * Converts a string to uppercase.
 */
declare function upper<T extends SQLExpression<string | null>>(value: T): SQL<UppercaseOrNull<SQLResult<T>>>;
//#endregion
export { MergeFindManyArgs, MergeRelationsFilter, SQLCaseWhen, SQLTimestamp, ToSQL, abs, caseWhen, ceil, coalesce, concatWithSeparator, currentDate, currentTime, currentTimestamp, floor, length, lower, mergeFindManyArgs, mergeRelationsFilter, mod, nest, nullif, power, round, sqrt, substring, toSQL, toSelection, trim, upper };