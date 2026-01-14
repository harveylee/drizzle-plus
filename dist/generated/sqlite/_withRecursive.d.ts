import { ColumnsSelection } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { WithSubqueryWithSelection } from "drizzle-orm/sqlite-core";
import * as V1 from "drizzle-orm/_relations";
import { AnyRelations as AnyRelations$1, TablesRelationalConfig as TablesRelationalConfig$1 } from "drizzle-orm/relations";

//#region src/generated/sqlite/$withRecursive.d.ts
declare module 'drizzle-orm/sqlite-core' {
  interface BaseSQLiteDatabase<TResultKind extends 'sync' | 'async', TRunResult, TFullSchema extends Record<string, unknown>, TRelations extends AnyRelations$1, TTablesConfig extends TablesRelationalConfig$1, TSchema extends V1.TablesRelationalConfig> {
    /**
     * Use this instead of `$with()` to create a subquery that can reference
     * itself. If TypeScript is failing, it may help to declare the selection
     * type explicitly at the `.as<{…}>()` call.
     *
     * A recursive CTE allows you to perform recursion within a query using the
     * `WITH RECURSIVE` syntax. A recursive CTE is often referred to as a
     * recursive query.
     */
    $withRecursive<TAlias extends string>(alias: TAlias): {
      as<TSelection extends ColumnsSelection>(qb: (self: WithSubqueryWithSelection<TSelection, TAlias>) => TypedQueryBuilder<TSelection>): WithSubqueryWithSelection<TSelection, TAlias>;
    };
  }
}