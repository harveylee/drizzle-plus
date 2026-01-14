import { QueryPromise } from "drizzle-orm/query-promise";

//#region src/orThrow.d.ts
declare module 'drizzle-orm/query-promise' {
  interface QueryPromise<T> {
    /**
     * Overrides the query's `execute` method to throw an error if the query
     * returns no rows. You may provide a custom error message, otherwise the
     * default message is `'No rows returned'`.
     */
    orThrow(message?: string): QueryPromise<Exclude<T, null | undefined>>;
  }
}
//#endregion
export { QueryPromise };