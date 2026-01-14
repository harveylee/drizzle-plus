import "../../count-DZyGpa_5.js";
import { BuildQueryResult, DBQueryConfig, KnownKeysOnly, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";

//#region src/generated/sqlite/findManyAndCount.d.ts
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
declare module 'drizzle-orm/sqlite-core/query-builders/query' {
  interface RelationalQueryBuilder<TMode extends 'sync' | 'async', TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    findManyAndCount<TConfig extends DBQueryConfig<'many', TSchema, TFields>>(config?: KnownKeysOnly<TConfig, DBQueryConfig<'many', TSchema, TFields>>): FindManyAndCountQueryPromise<BuildQueryResult<TSchema, TFields, TConfig>>;
  }
}
//#endregion
export { FindManyAndCountResult };