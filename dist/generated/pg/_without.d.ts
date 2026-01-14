import { TableConfig } from "drizzle-orm/pg-core";

//#region src/generated/pg/$without.d.ts
declare module 'drizzle-orm/pg-core' {
  interface PgTable<T extends TableConfig> {
    $without<TField extends keyof T['columns']>(...fields: TField[]): Omit<T['columns'], TField>;
  }
}