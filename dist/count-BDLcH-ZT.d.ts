import * as drizzle_orm1 from "drizzle-orm";
import { BuildRelationalQueryResult, QueryPromise, RelationsFilter, SQL, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import * as drizzle_orm_mysql_core5 from "drizzle-orm/mysql-core";
import { MySqlDialect, MySqlSession, MySqlTable } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/count.d.ts
declare module 'drizzle-orm/mysql-core/query-builders/query' {
  interface RelationalQueryBuilder<TPreparedQueryHKT extends drizzle_orm_mysql_core5.PreparedQueryHKTBase, TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    count(filter?: RelationsFilter<TFields, TSchema>): CountQueryPromise;
  }
}
declare class CountQueryPromise extends QueryPromise<number> {
  private table;
  private filter;
  private session;
  private dialect;
  constructor(table: MySqlTable, filter: SQL | undefined, session: MySqlSession, dialect: MySqlDialect);
  execute(): Promise<number>;
  toSQL(): drizzle_orm1.QueryWithTypings;
  getSQL(): SQL<unknown>;
  protected _getQuery(): BuildRelationalQueryResult;
}
//#endregion
export { CountQueryPromise };