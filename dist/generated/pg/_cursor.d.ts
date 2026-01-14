import "../../json-ZhdFcNhs.js";
import { InferOrderBy } from "../../types-BIurY8o2.js";
import { InferColumns } from "../../types-CqnuBP7C.js";
import { KnownKeysOnly, RelationFieldsFilterInternals, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { RelationalQueryBuilder } from "drizzle-orm/pg-core/query-builders/query";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";

//#region src/generated/pg/$cursor.d.ts
type InferCursor<T extends RelationalQueryBuilder<any, any>> = Partial<SelectResultFields<InferColumns<T>>>;
/**
 * The return type of the `$cursor` method.
 *
 * @see https://github.com/alloc/drizzle-plus
 */
interface RelationalQueryCursor<TOrderBy extends object, TCursor extends object | null | undefined> {
  where: TCursor extends object ? { [K in keyof TCursor]?: RelationFieldsFilterInternals<Exclude<TCursor[K], undefined>> } : TCursor extends null | undefined ? undefined : never;
  orderBy: TOrderBy;
}
declare module 'drizzle-orm/pg-core/query-builders/query' {
  interface RelationalQueryBuilder<TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    $cursor<TOrderBy extends Exclude<InferOrderBy<this>, Function>, TCursor extends KnownKeysOnly<InferCursor<this>, TOrderBy> | null | undefined>(orderBy: TOrderBy, cursor: TCursor): RelationalQueryCursor<TOrderBy, TCursor>;
  }
}
//#endregion
export { InferCursor, RelationalQueryCursor };