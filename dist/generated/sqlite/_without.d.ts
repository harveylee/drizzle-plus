import { TableConfig } from "drizzle-orm/sqlite-core";

//#region src/generated/sqlite/$without.d.ts
declare module 'drizzle-orm/sqlite-core' {
  interface SQLiteTable<T extends TableConfig> {
    $without<TField extends keyof T['columns']>(...fields: TField[]): Omit<T['columns'], TField>;
  }
}