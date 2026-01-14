import { RawFieldsToSelection } from "./types-BIurY8o2.js";
import { ColumnBaseConfig, ColumnDataType, SQL, Subquery } from "drizzle-orm";
import { RelationalQueryBuilder as RelationalQueryBuilder$1 } from "drizzle-orm/mysql-core/query-builders/query";
import { MySqlColumn } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/types.d.ts

/**
 * Infer table columns from a `db.query` factory.
 *
 * @example
 * ```ts
 * type FooColumns = InferColumns<typeof db.query.foo>
 * //   ^? type { id: MySqlColumn; name: MySqlColumn }
 * ```
 */
type InferColumns<T extends RelationalQueryBuilder$1<any, any, any>> = T extends RelationalQueryBuilder$1<any, any, infer TFields> ? TFields['columns'] : never;
type RawFieldsToColumnsSelection<T extends Record<string, unknown>> = RawFieldsToSelection<T> extends infer TSelection ? { [K in keyof TSelection]: TSelection[K] extends infer TExpression ? TExpression | (TExpression extends SQL.Aliased<infer TData> ? MySqlColumn<ColumnBaseConfig<ColumnDataType, string> & {
  data: Exclude<TData, null>;
  notNull: TData | null extends TData ? false : true;
}> : never) : never } : never;
type RawFieldsToSubquery<T extends Record<string, unknown>, TAlias extends string = string> = RawFieldsToColumnsSelection<T> extends infer TSelection ? Subquery<TAlias, TSelection & Record<string, unknown>> & TSelection : never;
type InferCastResult<T extends SQLType | (string & {})> = SQLType extends T ? unknown : T extends SQLType ? SQLTypeToJS[T] : unknown;
type SQLType = string & keyof SQLTypeToJS;
interface SQLTypeToJS {
  tinyint: number;
  smallint: number;
  mediumint: number;
  int: number;
  bigint: number;
  float: number;
  double: number;
  decimal: number;
  real: number;
  boolean: boolean;
  char: string;
  varchar: string;
  text: string;
  date: string;
  time: string;
  datetime: string;
  json: any;
}
//#endregion
export { InferCastResult, InferColumns, RawFieldsToSubquery, type RelationalQueryBuilder$1 as RelationalQueryBuilder, SQLType, SQLTypeToJS };