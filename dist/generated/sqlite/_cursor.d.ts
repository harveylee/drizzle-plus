import "../../json-yDXowxm9.js";
import { InferOrderBy } from "../../types-BGX1maf_.js";
import { InferColumns } from "../../types-BPBSIjA3.js";
import { KnownKeysOnly, RelationFieldsFilterInternals, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { RelationalQueryBuilder } from "drizzle-orm/sqlite-core/query-builders/query";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";

//#region src/generated/sqlite/$cursor.d.ts
type InferCursor<T extends RelationalQueryBuilder<any, any, any>> = Partial<SelectResultFields<InferColumns<T>>>;
/**
 * The return type of the `$cursor` method.
 *
 * @see https://github.com/alloc/drizzle-plus
 */
interface RelationalQueryCursor<TOrderBy extends object, TCursor extends object | null | undefined> {
  where: TCursor extends object ? { [K in keyof TCursor]?: RelationFieldsFilterInternals<Exclude<TCursor[K], undefined>> } : TCursor extends null | undefined ? undefined : never;
  orderBy: TOrderBy;
}
declare module 'drizzle-orm/sqlite-core/query-builders/query' {
  interface RelationalQueryBuilder<TMode extends 'sync' | 'async', TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    $cursor<TOrderBy extends Exclude<InferOrderBy<this>, Function>, TCursor extends KnownKeysOnly<InferCursor<this>, TOrderBy> | null | undefined>(orderBy: TOrderBy, cursor: TCursor): RelationalQueryCursor<TOrderBy, TCursor>;
  }
}
//#endregion
export { InferCursor, RelationalQueryCursor };