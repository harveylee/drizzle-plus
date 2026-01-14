import { ColumnsSelection, QueryPromise, SQL, SQLWrapper, Subquery } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { PgColumn, PgDialect, PgSession, PgSetOperatorWithResult, SelectedFields } from "drizzle-orm/pg-core";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";

//#region src/generated/pg/withoutFrom.d.ts
declare module 'drizzle-orm/pg-core' {
  interface PgSelectBuilder<TSelection extends SelectedFields | undefined, TBuilderMode extends 'db' | 'qb'> {
    withoutFrom(): TSelection extends SelectedFields ? PgSelectWithoutFrom<TSelection> : never;
  }
}
type PgSelectBuilderPrivate = {
  fields: ColumnsSelection;
  session?: PgSession;
  dialect: PgDialect;
  withList: Subquery[];
  distinct?: boolean | {
    on: (PgColumn | SQLWrapper)[];
  };
};
declare class PgSelectWithoutFrom<TSelection extends SelectedFields> extends TypedQueryBuilder<TSelection, SelectResultFields<TSelection>[]> implements PgSetOperatorWithResult<SelectResultFields<TSelection>[]> {
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
  constructor(select: PgSelectBuilderPrivate, selectedFields: TSelection);
  getSQL(): SQL<unknown>;
  private _prepare;
}
interface PgSelectWithoutFrom<TSelection extends SelectedFields> extends QueryPromise<SelectResultFields<TSelection>[]> {
  execute(): Promise<SelectResultFields<TSelection>[]>;
}
//#endregion
export { PgSelectWithoutFrom };