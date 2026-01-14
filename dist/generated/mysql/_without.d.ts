import { TableConfig } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/$without.d.ts
declare module 'drizzle-orm/mysql-core' {
  interface MySqlTable<T extends TableConfig> {
    $without<TField extends keyof T['columns']>(...fields: TField[]): Omit<T['columns'], TField>;
  }
}