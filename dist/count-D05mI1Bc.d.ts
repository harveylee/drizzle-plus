import * as drizzle_orm0 from "drizzle-orm";
import { BuildRelationalQueryResult, QueryPromise, RelationsFilter, SQL, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { PgDialect, PgSession, PgTable } from "drizzle-orm/pg-core";

//#region src/generated/pg/count.d.ts
declare module 'drizzle-orm/pg-core/query-builders/query' {
  interface RelationalQueryBuilder<TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    count(filter?: RelationsFilter<TFields, TSchema>): CountQueryPromise;
  }
}
declare class CountQueryPromise extends QueryPromise<number> {
  private table;
  private filter;
  private session;
  private dialect;
  constructor(table: PgTable, filter: SQL | undefined, session: PgSession, dialect: PgDialect);
  execute(): Promise<number>;
  toSQL(): drizzle_orm0.QueryWithTypings;
  getSQL(): SQL<unknown>;
  protected _getQuery(): BuildRelationalQueryResult;
}
//#endregion
export { CountQueryPromise };