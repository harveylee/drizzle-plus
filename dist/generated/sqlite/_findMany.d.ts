import { DBQueryConfig, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { MergeFindManyArgs } from "drizzle-plus";

//#region src/generated/sqlite/$findMany.d.ts
declare module 'drizzle-orm/sqlite-core/query-builders/query' {
  interface RelationalQueryBuilder<TMode extends 'sync' | 'async', TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    $findMany<const TConfig extends DBQueryConfig<'many', TSchema, TFields>>(config: TConfig): TConfig;
    $findMany<TBaseConfig extends DBQueryConfig<'many', TSchema, TFields>, const TConfig extends DBQueryConfig<'many', TSchema, TFields>>(baseConfig: TBaseConfig, config: TConfig): MergeFindManyArgs<TBaseConfig, TConfig>;
  }
}