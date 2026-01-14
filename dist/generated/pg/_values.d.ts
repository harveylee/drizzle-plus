import "../../json-yDXowxm9.js";
import { RawFieldsToSelection } from "../../types-BGX1maf_.js";
import { AnyRelations, SQL, Subquery, TablesRelationalConfig } from "drizzle-orm";
import { SQLWrapper as SQLWrapper$1 } from "drizzle-orm/sql";
import * as drizzle_orm_pg_core0 from "drizzle-orm/pg-core";
import { PgColumn, PgTable, TableConfig, WithSubqueryWithSelection } from "drizzle-orm/pg-core";
import * as V1 from "drizzle-orm/_relations";

//#region src/functions/pg/types.d.ts
type SQLType = string & keyof SQLTypeToJS;
interface SQLTypeToJS {
  int2: number;
  int4: number;
  int8: number;
  smallint: number;
  integer: number;
  bigint: number;
  decimal: number;
  numeric: number;
  real: number;
  float4: number;
  float8: number;
  double: number;
  serial: number;
  bigserial: number;
  money: number;
  bool: boolean;
  char: string;
  varchar: string;
  text: string;
  citext: string;
  name: string;
  date: string;
  time: string;
  timetz: string;
  timestamp: any;
  timestamptz: any;
  interval: string;
  uuid: string;
  json: any;
  jsonb: any;
  inet: string;
  cidr: string;
  macaddr: string;
  bit: string;
  varbit: string;
}
//#endregion
//#region src/generated/pg/$values.d.ts
type PgTableWithTheseColumns<K extends string> = PgTable<Omit<TableConfig, 'columns'> & {
  columns: Record<K, PgColumn>;
}>;
declare module 'drizzle-orm/pg-core' {
  interface PgDatabase<TQueryResult extends drizzle_orm_pg_core0.PgQueryResultHKT, TFullSchema extends Record<string, unknown>, TRelations extends AnyRelations, TTablesConfig extends TablesRelationalConfig, TSchema extends V1.TablesRelationalConfig> {
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
    $values<TRow extends Record<string, unknown>>(rows: readonly TRow[], typings?: { [K in keyof TRow]?: SQLType } | PgTableWithTheseColumns<string & keyof TRow>): ValuesList<TRow>;
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
      <TAlias extends string, TRow extends Record<string, unknown>>(alias: TAlias, rows: readonly TRow[], typings?: { [K in keyof TRow]?: SQLType } | PgTableWithTheseColumns<string & keyof TRow>): WithSubqueryWithSelection<RawFieldsToSelection<TRow>, string>;
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
  }, keys: string[], rows: readonly object[], typings?: Partial<Record<string, SQLType>> | PgTable);
  as<TAlias extends string>(alias: TAlias): ValuesListSubquery<TAlias, TValues>;
  getSQL(): SQL<unknown>;
  inlineParams(): this;
}
//#endregion
export { ValuesList, ValuesListSubquery };