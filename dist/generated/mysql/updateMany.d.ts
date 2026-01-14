import "../../json-yDXowxm9.js";
import { AnyRelationsFilter, ExtractTable, OrderByClause, ReturningClause, ReturningResultFields } from "../../types-BGX1maf_.js";
import "../../types-Cvre74mP.js";
import { BuildRelationalQueryResult, Column, Query, QueryPromise, RelationsFilter, SQL, Subquery, Table, TableRelationalConfig, TablesRelationalConfig, WithSubquery } from "drizzle-orm";
import * as drizzle_orm_mysql_core0 from "drizzle-orm/mysql-core";
import { MySqlColumn, MySqlDialect, MySqlSession, MySqlTable, MySqlUpdateSetSource, SelectedFields } from "drizzle-orm/mysql-core";
import { CasingCache } from "drizzle-orm/casing";

//#region src/generated/mysql/internal.d.ts

type InferDialect<TTable extends Table> = TTable['_']['config']['dialect'];
type ExcludeDialect<TTable extends Table, TDialect extends string, T> = InferDialect<TTable> extends TDialect ? never : T;
//#endregion
//#region src/generated/mysql/updateMany.d.ts
interface DBUpdateManyConfig<TTable extends MySqlTable, TReturning extends ReturningClause<TTable> = ReturningClause<TTable>, TWhere = AnyRelationsFilter> {
  set: MySqlUpdateSetSource<TTable> | ((table: TTable['_']['columns']) => MySqlUpdateSetSource<TTable>);
  /**
   * Specify a filter to only update rows that match the filter.
   */
  where?: TWhere;
  /**
   * Specify the order of the rows to update. If undefined, the rows are updated
   * in an arbitrary order.
   */
  orderBy?: OrderByClause<TTable>;
  /**
   * Specify the maximum number of rows to update.
   */
  limit?: number;
  /**
   * Specify which columns to return. An empty object means “return nothing”.
   *
   * If left undefined, the query returns the number of rows updated.
   */
  returning?: ExcludeDialect<TTable, 'mysql', TReturning | ((table: TTable['_']['columns']) => TReturning) | undefined>;
}
declare module 'drizzle-orm/mysql-core/query-builders/query' {
  interface RelationalQueryBuilder<TPreparedQueryHKT extends drizzle_orm_mysql_core0.PreparedQueryHKTBase, TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    updateMany<TReturning extends ReturningClause<ExtractTable<TFields>> = {}>(config: DBUpdateManyConfig<ExtractTable<TFields, MySqlTable>, TReturning, RelationsFilter<TFields, TSchema>>): UpdateManyQueryPromise<ExtractTable<TFields, MySqlTable>, TReturning>;
  }
}
type UpdateManyQueryResult<TTable extends MySqlTable, TReturning extends ReturningClause<TTable>> = keyof TReturning extends never ? number : ReturningResultFields<'many', TTable, TReturning>;
interface UpdateManyQueryPromise<TTable extends MySqlTable, TReturning extends ReturningClause<TTable>> extends QueryPromise<UpdateManyQueryResult<TTable, TReturning>> {
  toSQL(): Query;
}
//#endregion
export { DBUpdateManyConfig, UpdateManyQueryPromise, UpdateManyQueryResult };