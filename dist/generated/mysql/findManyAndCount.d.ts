import "../../count-BDLcH-ZT.js";
import { BuildQueryResult, DBQueryConfig, KnownKeysOnly, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import * as drizzle_orm_mysql_core3 from "drizzle-orm/mysql-core";

//#region src/generated/mysql/findManyAndCount.d.ts
interface FindManyAndCountResult<T> {
  data: T[];
  count: number;
}
interface FindManyAndCountQueryPromise<T> extends PromiseLike<FindManyAndCountResult<T>> {
  toSQL: () => {
    findMany: {
      sql: string;
      params: any[];
    };
    count: {
      sql: string;
      params: any[];
    };
  };
}
declare module 'drizzle-orm/mysql-core/query-builders/query' {
  interface RelationalQueryBuilder<TPreparedQueryHKT extends drizzle_orm_mysql_core3.PreparedQueryHKTBase, TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    findManyAndCount<TConfig extends DBQueryConfig<'many', TSchema, TFields>>(config?: KnownKeysOnly<TConfig, DBQueryConfig<'many', TSchema, TFields>>): FindManyAndCountQueryPromise<BuildQueryResult<TSchema, TFields, TConfig>>;
  }
}
//#endregion
export { FindManyAndCountResult };