import "../../json-ZhdFcNhs.js";
import { ExtractTable, ReturningClause, ReturningResultFields } from "../../types-BIurY8o2.js";
import { Query, QueryPromise, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { PgInsertValue, PgTable } from "drizzle-orm/pg-core";

//#region src/generated/pg/create.d.ts
interface DBCreateConfig<TMode extends 'one' | 'many', TTable extends PgTable, TReturning extends ReturningClause<TTable>> {
  data: TMode extends 'one' ? PgInsertValue<TTable> : readonly PgInsertValue<TTable>[];
  /**
   * If true, inserted rows that conflict with an existing row will be ignored,
   * rather than cause an error.
   */
  skipDuplicates?: boolean;
  /**
   * Specify which columns to return. An empty object means “return nothing”.
   *
   * If left undefined, the query returns the number of rows inserted.
   */
  returning?: TReturning | ((table: TTable['_']['columns']) => TReturning) | undefined;
}
declare module 'drizzle-orm/pg-core/query-builders/query' {
  interface RelationalQueryBuilder<TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    create<TReturning extends ReturningClause<ExtractTable<TFields>> = {}>(config: DBCreateConfig<'one', ExtractTable<TFields>, TReturning>): CreateQueryPromise<'one', ExtractTable<TFields>, TReturning>;
    create<TReturning extends ReturningClause<ExtractTable<TFields>> = {}>(config: DBCreateConfig<'many', ExtractTable<TFields>, TReturning>): CreateQueryPromise<'many', ExtractTable<TFields>, TReturning>;
  }
}
type CreateQueryResult<TMode extends 'one' | 'many', TTable extends PgTable, TReturning extends ReturningClause<TTable>> = keyof TReturning extends never ? number : ReturningResultFields<TMode, TTable, TReturning>;
interface CreateQueryPromise<TMode extends 'one' | 'many', TTable extends PgTable, TReturning extends ReturningClause<TTable>> extends QueryPromise<CreateQueryResult<TMode, TTable, TReturning>> {
  toSQL(): Query;
}
//#endregion
export { CreateQueryPromise, CreateQueryResult, DBCreateConfig };