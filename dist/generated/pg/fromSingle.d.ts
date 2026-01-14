import { PgSelectQueryBuilderBase, PgSelectQueryBuilderHKT, SelectedFields } from "drizzle-orm/pg-core";

//#region src/generated/pg/fromSingle.d.ts
declare module 'drizzle-orm/pg-core' {
  interface PgSelectBuilder<TSelection extends SelectedFields | undefined, TBuilderMode extends 'db' | 'qb'> {
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
    fromSingle(): TSelection extends SelectedFields ? PgSelectQueryBuilderBase<PgSelectQueryBuilderHKT, undefined, TSelection, 'partial'> : never;
  }
}