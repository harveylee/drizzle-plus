import "../../json-ZhdFcNhs.js";
import { RawFieldsToSelection } from "../../types-BIurY8o2.js";
import { AnyRelations, TablesRelationalConfig } from "drizzle-orm";
import * as drizzle_orm_pg_core0 from "drizzle-orm/pg-core";
import * as V1 from "drizzle-orm/_relations";

//#region src/generated/pg/$select.d.ts
declare module 'drizzle-orm/pg-core/db' {
  interface PgDatabase<TQueryResult extends drizzle_orm_pg_core0.PgQueryResultHKT, TFullSchema extends Record<string, unknown>, TRelations extends AnyRelations, TTablesConfig extends TablesRelationalConfig, TSchema extends V1.TablesRelationalConfig> {
    /**
     * Create a "selection" object compatible with `db.select` from a plain
     * object containing almost any value.
     *
     * - `undefined` values are ignored
     * - primitive values (including `null`) are wrapped with `sql` template
     * - `Date` values are treated as ISO strings
     * - subqueries and `SQL` objects are preserved
     * - everything else is coerced to a JSON string
     */
    $select<TFields extends Record<string, unknown>>(fields: TFields): RawFieldsToSelection<TFields>;
  }
}