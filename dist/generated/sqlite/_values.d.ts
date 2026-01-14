import "../../json-ZhdFcNhs.js";
import { RawFieldsToSelection } from "../../types-BIurY8o2.js";
import { AnyRelations, SQL, Subquery, TablesRelationalConfig } from "drizzle-orm";
import { SQLWrapper as SQLWrapper$1 } from "drizzle-orm/sql";
import { SQLiteColumn, SQLiteTable, TableConfig, WithSubqueryWithSelection } from "drizzle-orm/sqlite-core";
import * as V1 from "drizzle-orm/_relations";

//#region src/functions/sqlite/types.d.ts
type SQLType = string & keyof SQLTypeToJS;
interface SQLTypeToJS {
  integer: number;
  real: number;
  text: string;
  blob: any;
}
//#endregion
//#region src/generated/sqlite/$values.d.ts
type SQLiteTableWithTheseColumns<K extends string> = SQLiteTable<Omit<TableConfig, 'columns'> & {
  columns: Record<K, SQLiteColumn>;
}>;
declare module 'drizzle-orm/sqlite-core' {
  interface BaseSQLiteDatabase<TResultKind extends 'sync' | 'async', TRunResult, TFullSchema extends Record<string, unknown>, TRelations extends AnyRelations, TTablesConfig extends TablesRelationalConfig, TSchema extends V1.TablesRelationalConfig> {
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
    $values<TRow extends Record<string, unknown>>(rows: readonly TRow[], typings?: { [K in keyof TRow]?: SQLType } | SQLiteTableWithTheseColumns<string & keyof TRow>): ValuesList<TRow>;
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
      <TAlias extends string, TRow extends Record<string, unknown>>(alias: TAlias, rows: readonly TRow[], typings?: { [K in keyof TRow]?: SQLType } | SQLiteTableWithTheseColumns<string & keyof TRow>): WithSubqueryWithSelection<RawFieldsToSelection<TRow>, string>;
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
  }, keys: string[], rows: readonly object[], typings?: Partial<Record<string, SQLType>> | SQLiteTable);
  as<TAlias extends string>(alias: TAlias): ValuesListSubquery<TAlias, TValues>;
  getSQL(): SQL<unknown>;
  inlineParams(): this;
}
//#endregion
export { ValuesList, ValuesListSubquery };