import { MySqlSelectQueryBuilderBase, MySqlSelectQueryBuilderHKT, PreparedQueryHKTBase, SelectedFields } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/fromSingle.d.ts
declare module 'drizzle-orm/mysql-core' {
  interface MySqlSelectBuilder<TSelection extends SelectedFields | undefined, TPreparedQueryHKT extends PreparedQueryHKTBase, TBuilderMode extends 'db' | 'qb'> {
    /**
     * Creates a single-row placeholder base that can be left-joined with other
     * subqueries. This ensures the final result set always contains exactly one
     * row, even if all joined subqueries are empty.
     *
     * This is sometimes called the 'dummy row subquery' pattern or the
     * 'single-row placeholder' pattern.
     *
     * Use this when you need guaranteed single-row results from queries with
     * optional left joins, such as aggregate queries that should return one row
     * even with no matching data.
     *
     * Equivalent to calling `.from(sql.raw('(SELECT 1) AS "placeholder"'))`.
     */
    fromSingle(): TSelection extends SelectedFields ? MySqlSelectQueryBuilderBase<MySqlSelectQueryBuilderHKT, undefined, TSelection, 'partial', TPreparedQueryHKT> : never;
  }
}