import "../../json-yDXowxm9.js";
import { ExtractTable, ReturningClause, ReturningResultFields } from "../../types-BGX1maf_.js";
import { Query, QueryPromise, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { SQLiteInsertValue, SQLiteTable } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/create.d.ts
interface DBCreateConfig<TMode extends 'one' | 'many', TTable extends SQLiteTable, TReturning extends ReturningClause<TTable>> {
  data: TMode extends 'one' ? SQLiteInsertValue<TTable> : readonly SQLiteInsertValue<TTable>[];
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
declare module 'drizzle-orm/sqlite-core/query-builders/query' {
  interface RelationalQueryBuilder<TMode extends 'sync' | 'async', TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    create<TReturning extends ReturningClause<ExtractTable<TFields>> = {}>(config: DBCreateConfig<'one', ExtractTable<TFields>, TReturning>): CreateQueryPromise<'one', ExtractTable<TFields>, TReturning>;
    create<TReturning extends ReturningClause<ExtractTable<TFields>> = {}>(config: DBCreateConfig<'many', ExtractTable<TFields>, TReturning>): CreateQueryPromise<'many', ExtractTable<TFields>, TReturning>;
  }
}
type CreateQueryResult<TMode extends 'one' | 'many', TTable extends SQLiteTable, TReturning extends ReturningClause<TTable>> = keyof TReturning extends never ? number : ReturningResultFields<TMode, TTable, TReturning>;
interface CreateQueryPromise<TMode extends 'one' | 'many', TTable extends SQLiteTable, TReturning extends ReturningClause<TTable>> extends QueryPromise<CreateQueryResult<TMode, TTable, TReturning>> {
  toSQL(): Query;
}
//#endregion
export { CreateQueryPromise, CreateQueryResult, DBCreateConfig };