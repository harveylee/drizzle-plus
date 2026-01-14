import "../../json-ZhdFcNhs.js";
import { ResultFieldsToSelection } from "../../types-BIurY8o2.js";
import * as drizzle_orm_mysql_core6 from "drizzle-orm/mysql-core";
import { PreparedQueryHKTBase, SelectedFields, WithSubqueryWithSelection } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/as.d.ts
type MySqlRelationalSubquery<TResult, TAlias extends string> = WithSubqueryWithSelection<ResultFieldsToSelection<TResult>, TAlias>;
declare module 'drizzle-orm/mysql-core/query-builders/query' {
  interface MySqlRelationalQuery<TPreparedQueryHKT extends drizzle_orm_mysql_core6.PreparedQueryHKTBase, TResult> {
    as<TAlias extends string>(alias: TAlias): MySqlRelationalSubquery<TResult, TAlias>;
  }
}
declare module 'drizzle-orm/mysql-core' {
  interface MySqlSelectBuilder<TSelection extends SelectedFields | undefined, TPreparedQueryHKT extends PreparedQueryHKTBase, TBuilderMode extends 'db' | 'qb'> {
    as<TAlias extends string>(alias: TAlias): TSelection extends SelectedFields ? WithSubqueryWithSelection<TSelection, TAlias> : never;
  }
}
//#endregion
export { MySqlRelationalSubquery };