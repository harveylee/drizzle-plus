import "../../json-ZhdFcNhs.js";
import { ResultFieldsToSelection } from "../../types-BIurY8o2.js";
import { SelectedFields, WithSubqueryWithSelection } from "drizzle-orm/pg-core";

//#region src/generated/pg/as.d.ts
type PgRelationalSubquery<TResult, TAlias extends string> = WithSubqueryWithSelection<ResultFieldsToSelection<TResult>, TAlias>;
declare module 'drizzle-orm/pg-core/query-builders/query' {
  interface PgRelationalQuery<TResult> {
    as<TAlias extends string>(alias: TAlias): PgRelationalSubquery<TResult, TAlias>;
  }
}
declare module 'drizzle-orm/pg-core' {
  interface PgSelectBuilder<TSelection extends SelectedFields | undefined, TBuilderMode extends 'db' | 'qb'> {
    as<TAlias extends string>(alias: TAlias): TSelection extends SelectedFields ? WithSubqueryWithSelection<TSelection, TAlias> : never;
  }
}
//#endregion
export { PgRelationalSubquery };