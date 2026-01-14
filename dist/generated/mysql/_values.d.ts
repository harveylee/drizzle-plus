import "../../json-ZhdFcNhs.js";
import { RawFieldsToSelection } from "../../types-BIurY8o2.js";
import { AnyRelations, SQL, Subquery, TablesRelationalConfig } from "drizzle-orm";
import { SQLWrapper as SQLWrapper$1 } from "drizzle-orm/sql";
import * as drizzle_orm_mysql_core4 from "drizzle-orm/mysql-core";
import { MySqlColumn, MySqlTable, PreparedQueryHKTBase, TableConfig, WithSubqueryWithSelection } from "drizzle-orm/mysql-core";
import * as V1 from "drizzle-orm/_relations";

//#region src/functions/mysql/types.d.ts
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
//#region src/generated/mysql/$values.d.ts
type MySqlTableWithTheseColumns<K extends string> = MySqlTable<Omit<TableConfig, 'columns'> & {
  columns: Record<K, MySqlColumn>;
}>;
declare module 'drizzle-orm/mysql-core' {
  interface MySqlDatabase<TQueryResult extends drizzle_orm_mysql_core4.MySqlQueryResultHKT, TPreparedQueryHKT extends PreparedQueryHKTBase, TFullSchema extends Record<string, unknown>, TRelations extends AnyRelations, TTablesConfig extends TablesRelationalConfig, TSchema extends V1.TablesRelationalConfig> {
    /**
     * Allows you to declare a values list as raw SQL or a subquery. Use the
     * `getSQL` method to get the raw SQL. Use the `as` method to get a
     * subquery.
     *
     * @example
     * ```ts
     * const myValues = db.$values([{ a: 1 }, { a: 2 }])
     *
     * db.select().from(myValues.as('my_values'))
     * ```
     */
    $values<TRow extends Record<string, unknown>>(rows: readonly TRow[], typings?: { [K in keyof TRow]?: SQLType } | MySqlTableWithTheseColumns<string & keyof TRow>): ValuesList<TRow>;
    /**
     * Allows you to declare a values list in a CTE.
     *
     * @example
     * ```ts
     * const myValues = db.$withValues('my_values', [{ a: 1 }, { a: 2 }])
     *
     * db.with(myValues).select().from(myValues)
     * ```
     */
    $withValues: {
      <TAlias extends string, TRow extends Record<string, unknown>>(alias: TAlias, rows: readonly TRow[], typings?: { [K in keyof TRow]?: SQLType } | MySqlTableWithTheseColumns<string & keyof TRow>): WithSubqueryWithSelection<RawFieldsToSelection<TRow>, string>;
    };
  }
}
type ValuesListSubquery<TAlias extends string, TValues extends Record<string, unknown>> = RawFieldsToSelection<TValues> extends infer TSelectedFields ? Subquery<TAlias, TSelectedFields & Record<string, unknown>> & TSelectedFields : never;
declare class ValuesList<TValues extends Record<string, unknown> = Record<string, unknown>> implements SQLWrapper$1<unknown> {
  private casing;
  private keys;
  private rows;
  _: {
    selectedFields: RawFieldsToSelection<TValues>;
  };
  private shouldInlineParams;
  private typings?;
  constructor(casing: {
    convert: (key: string) => string;
  }, keys: string[], rows: readonly object[], typings?: Partial<Record<string, SQLType>> | MySqlTable);
  as<TAlias extends string>(alias: TAlias): ValuesListSubquery<TAlias, TValues>;
  getSQL(): SQL<unknown>;
  inlineParams(): this;
}
//#endregion
export { ValuesList, ValuesListSubquery };