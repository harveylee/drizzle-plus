import { DBQueryConfig, TableRelationalConfig, TablesRelationalConfig } from "drizzle-orm";
import { MergeFindManyArgs } from "drizzle-plus";
import * as drizzle_orm_mysql_core1 from "drizzle-orm/mysql-core";

//#region src/generated/mysql/$findMany.d.ts
declare module 'drizzle-orm/mysql-core/query-builders/query' {
  interface RelationalQueryBuilder<TPreparedQueryHKT extends drizzle_orm_mysql_core1.PreparedQueryHKTBase, TSchema extends TablesRelationalConfig, TFields extends TableRelationalConfig> {
    $findMany<const TConfig extends DBQueryConfig<'many', TSchema, TFields>>(config: TConfig): TConfig;
    $findMany<TBaseConfig extends DBQueryConfig<'many', TSchema, TFields>, const TConfig extends DBQueryConfig<'many', TSchema, TFields>>(baseConfig: TBaseConfig, config: TConfig): MergeFindManyArgs<TBaseConfig, TConfig>;
  }
}