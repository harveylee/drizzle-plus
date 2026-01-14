import { RawFieldsToSelection } from "./types-BIurY8o2.js";
import { ColumnBaseConfig, ColumnDataType, SQL, Subquery } from "drizzle-orm";
import { RelationalQueryBuilder as RelationalQueryBuilder$1 } from "drizzle-orm/sqlite-core/query-builders/query";
import { SQLiteColumn } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/types.d.ts

/**
 * Infer table columns from a `db.query` factory.
 *
 * @example
 * ```ts
 * type FooColumns = InferColumns<typeof db.query.foo>
 * //   ^? type { id: SQLiteColumn; name: SQLiteColumn }
 * ```
 */
type InferColumns<T extends RelationalQueryBuilder$1<any, any, any>> = T extends RelationalQueryBuilder$1<any, any, infer TFields> ? TFields['columns'] : never;
type RawFieldsToColumnsSelection<T extends Record<string, unknown>> = RawFieldsToSelection<T> extends infer TSelection ? { [K in keyof TSelection]: TSelection[K] extends infer TExpression ? TExpression | (TExpression extends SQL.Aliased<infer TData> ? SQLiteColumn<ColumnBaseConfig<ColumnDataType, string> & {
  data: Exclude<TData, null>;
  notNull: TData | null extends TData ? false : true;
}> : never) : never } : never;
type RawFieldsToSubquery<T extends Record<string, unknown>, TAlias extends string = string> = RawFieldsToColumnsSelection<T> extends infer TSelection ? Subquery<TAlias, TSelection & Record<string, unknown>> & TSelection : never;
type InferCastResult<T extends SQLType | (string & {})> = SQLType extends T ? unknown : T extends SQLType ? SQLTypeToJS[T] : unknown;
type SQLType = string & keyof SQLTypeToJS;
interface SQLTypeToJS {
  integer: number;
  real: number;
  text: string;
  blob: any;
}
//#endregion
export { InferCastResult, InferColumns, RawFieldsToSubquery, type RelationalQueryBuilder$1 as RelationalQueryBuilder, SQLType, SQLTypeToJS };