import "../../json-yDXowxm9.js";
import { ExtractTable, ResultFieldsToSelection, ReturningClause, ReturningResultFields } from "../../types-BGX1maf_.js";
import { RelationalQuery } from "../../sqlite-DSFWNpNN.js";
import { Query, QueryPromise, RelationsFilter, SQL, Subquery, Table, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { QueryBuilder, SQLiteInsertSelectQueryBuilder, SQLiteInsertValue, SQLiteUpdateSetSource, WithSubqueryWithSelection } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/upsert.d.ts

/**
 * Represents a `select` query that will have its result set used as the values
 * of an `upsert` query.
 */
type SQLiteUpsertSelectQuery<TTable extends Table> = ((qb: QueryBuilder) => SQLiteInsertSelectQueryBuilder<TTable>) | SQLiteInsertSelectQueryBuilder<TTable> | Subquery<string, SQLiteInsertValue<TTable>> | RelationalQuery<SQLiteInsertValue<TTable> | SQLiteInsertValue<TTable>[] | undefined>;
type DBUpsertUpdateFn<TTable extends Table> = (tables: {
  current: TTable['_']['columns'];
  excluded: TTable['_']['columns'];
}) => Partial<SQLiteUpdateSetSource<TTable>>;
interface DBUpsertConfig<TMode extends 'one' | 'many', TTable extends Table, TReturning extends ReturningClause<TTable>, TWhere> {
  /**
   * CTEs to use in the query.
   */
  with?: Subquery[];
  /**
   * One or more rows to insert/update. This can also be a `SELECT` query or a
   * function that returns one.
   */
  data: TMode extends 'one' ? SQLiteInsertValue<TTable> : readonly SQLiteInsertValue<TTable>[] | SQLiteUpsertSelectQuery<TTable>;
  /**
   * Explicitly specify the columns to target for the `ON CONFLICT DO UPDATE`
   * clause.
   *
   * By default, `upsert` will infer the target columns from the inserted data.
   * Sometimes, this can lead to undesirable behavior. For example, if you
   * generate a UUID for the primary key while deduplicating rows using a
   * different unique column, you'll want to target that column instead of the
   * primary key column.
   */
  target?: readonly (keyof TTable['_']['columns'])[];
  /**
   * When defined, the `data` option is ignored for updates, and the result of
   * this `update` function is used instead.
   *
   * - The `current` argument can be used to reference the data of the existing
   * row.
   * - The `excluded` argument can be used to reference the data that failed to
   * insert. You're free to “spread” the `excluded` object into the `update`
   * result.
   */
  update?: DBUpsertUpdateFn<TTable> | undefined;
  /**
   * Specify a filter to only update rows that match the filter.
   */
  updateWhere?: TWhere | undefined;
  /**
   * Specify which columns to return. An empty object means “return nothing”.
   *
   * If left undefined, the query returns all columns of the updated row.
   */
  returning?: TReturning | ((table: TTable['_']['columns']) => TReturning) | undefined;
}
declare module 'drizzle-orm/sqlite-core/query-builders/query' {
  interface RelationalQueryBuilder<TMode extends 'sync' | 'async', TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    upsert<TReturning extends ReturningClause<ExtractTable<TFields>>>(config: DBUpsertConfig<'one', ExtractTable<TFields>, TReturning, RelationsFilter<TFields, TSchema>>): UpsertQueryPromise<'one', ExtractTable<TFields>, TReturning>;
    upsert<TReturning extends ReturningClause<ExtractTable<TFields>>>(config: DBUpsertConfig<'many', ExtractTable<TFields>, TReturning, RelationsFilter<TFields, TSchema>>): UpsertQueryPromise<'many', ExtractTable<TFields>, TReturning>;
  }
}
declare class UpsertQueryPromise<TMode extends 'one' | 'many', TTable extends Table, TReturning extends ReturningClause<TTable>> extends QueryPromise<ReturningResultFields<TMode, TTable, TReturning>> {
  private query;
  private returning;
  private first;
  constructor(query: QueryPromise<any>, returning: TReturning, first: boolean);
  execute(): Promise<ReturningResultFields<TMode, TTable, TReturning>>;
  getSQL(): SQL;
  toSQL(): Query;
  as<TAlias extends string>(alias: TAlias): WithSubqueryWithSelection<ResultFieldsToSelection<ReturningResultFields<TMode, TTable, TReturning>>, TAlias>;
}
//#endregion
export { DBUpsertConfig, SQLiteUpsertSelectQuery, UpsertQueryPromise };