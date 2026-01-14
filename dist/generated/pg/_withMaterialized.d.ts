import * as drizzle_orm_pg_core0 from "drizzle-orm/pg-core";
import { WithBuilder } from "drizzle-orm/pg-core";
import * as V1 from "drizzle-orm/_relations";
import { AnyRelations, TablesRelationalConfig } from "drizzle-orm/relations";

//#region src/generated/pg/$withMaterialized.d.ts
declare module 'drizzle-orm/pg-core' {
  interface PgDatabase<TQueryResult extends drizzle_orm_pg_core0.PgQueryResultHKT, TFullSchema extends Record<string, unknown>, TRelations extends AnyRelations, TTablesConfig extends TablesRelationalConfig, TSchema extends V1.TablesRelationalConfig> {
    /**
     * Similar to `$with()` but the CTE is materialized.
     *
     * Useful for ensuring a CTE is only executed once. The default behavior of
     * Postgres is to conditionally materialize the CTE based on certain
     * heuristics.
     *
     * @see https://www.postgresql.org/docs/current/queries-with.html#QUERIES-WITH-CTE-MATERIALIZATION
     */
    $withMaterialized: WithBuilder;
    /**
     * Similar to `$with()` but the CTE is **not** materialized.
     *
     * May improve performance by folding the CTE into its parent query. Only
     * allowed when the subquery is a `SELECT` with no use of volatile
     * functions.
     *
     * @see https://www.postgresql.org/docs/current/queries-with.html#QUERIES-WITH-CTE-MATERIALIZATION
     */
    $withNotMaterialized: WithBuilder;
  }
}