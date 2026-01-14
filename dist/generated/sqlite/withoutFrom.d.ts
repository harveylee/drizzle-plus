import { ColumnsSelection, QueryPromise, SQL, SQLWrapper, Subquery } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { SQLiteColumn, SQLiteDialect, SQLiteSession, SQLiteSetOperatorWithResult, SelectedFields } from "drizzle-orm/sqlite-core";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";

//#region src/generated/sqlite/withoutFrom.d.ts
declare module 'drizzle-orm/sqlite-core' {
  interface SQLiteSelectBuilder<TSelection extends SelectedFields | undefined, TResultType extends 'sync' | 'async', TRunResult, TBuilderMode extends 'db' | 'qb'> {
    withoutFrom(): TSelection extends SelectedFields ? SQLiteSelectWithoutFrom<TSelection> : never;
  }
}
type SQLiteSelectBuilderPrivate = {
  fields: ColumnsSelection;
  session?: SQLiteSession<any, any>;
  dialect: SQLiteDialect;
  withList: Subquery[];
  distinct?: boolean | {
    on: (SQLiteColumn | SQLWrapper)[];
  };
};
declare class SQLiteSelectWithoutFrom<TSelection extends SelectedFields> extends TypedQueryBuilder<TSelection, SelectResultFields<TSelection>[]> implements SQLiteSetOperatorWithResult<SelectResultFields<TSelection>[]> {
  _: {
    readonly hkt: any;
    readonly tableName: any;
    readonly selection: any;
    readonly selectMode: any;
    readonly nullabilityMap: any;
    readonly dynamic: any;
    readonly excludedMethods: any;
    readonly result: SelectResultFields<TSelection>[];
    readonly selectedFields: TSelection;
  };
  private config;
  private joinsNotNullableMap;
  private session;
  private dialect;
  private usedTables;
  constructor(select: SQLiteSelectBuilderPrivate, selectedFields: TSelection);
  getSQL(): SQL<unknown>;
  private _prepare;
}
interface SQLiteSelectWithoutFrom<TSelection extends SelectedFields> extends QueryPromise<SelectResultFields<TSelection>[]> {
  execute(): Promise<SelectResultFields<TSelection>[]>;
}
//#endregion
export { SQLiteSelectWithoutFrom };