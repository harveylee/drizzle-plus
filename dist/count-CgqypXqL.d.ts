import * as drizzle_orm1 from "drizzle-orm";
import { BuildRelationalQueryResult, QueryPromise, RelationsFilter, SQL, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { SQLiteDialect, SQLiteSession, SQLiteTable } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/count.d.ts
declare module 'drizzle-orm/sqlite-core/query-builders/query' {
  interface RelationalQueryBuilder<TMode extends 'sync' | 'async', TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    count(filter?: RelationsFilter<TFields, TSchema>): CountQueryPromise;
  }
}
declare class CountQueryPromise extends QueryPromise<number> {
  private table;
  private filter;
  private session;
  private dialect;
  constructor(table: SQLiteTable, filter: SQL | undefined, session: SQLiteSession<any, any>, dialect: SQLiteDialect);
  execute(): Promise<number>;
  toSQL(): drizzle_orm1.QueryWithTypings;
  getSQL(): SQL<unknown>;
  protected _getQuery(): BuildRelationalQueryResult;
}
//#endregion
export { CountQueryPromise };