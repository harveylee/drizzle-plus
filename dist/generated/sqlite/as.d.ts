import "../../json-yDXowxm9.js";
import { ResultFieldsToSelection } from "../../types-BGX1maf_.js";
import { SelectedFields, WithSubqueryWithSelection } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/as.d.ts
type SQLiteRelationalSubquery<TResult, TAlias extends string> = WithSubqueryWithSelection<ResultFieldsToSelection<TResult>, TAlias>;
declare module 'drizzle-orm/sqlite-core/query-builders/query' {
  interface SQLiteRelationalQuery<TType extends 'sync' | 'async', TResult> {
    as<TAlias extends string>(alias: TAlias): SQLiteRelationalSubquery<TResult, TAlias>;
  }
}
declare module 'drizzle-orm/sqlite-core' {
  interface SQLiteSelectBuilder<TSelection extends SelectedFields | undefined, TResultType extends 'sync' | 'async', TRunResult, TBuilderMode extends 'db' | 'qb'> {
    as<TAlias extends string>(alias: TAlias): TSelection extends SelectedFields ? WithSubqueryWithSelection<TSelection, TAlias> : never;
  }
}
//#endregion
export { SQLiteRelationalSubquery };