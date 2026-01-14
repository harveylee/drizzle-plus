import { ColumnsSelection, QueryPromise, SQL, SQLWrapper, Subquery } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { MySqlColumn, MySqlDialect, MySqlSession, MySqlSetOperatorWithResult, PreparedQueryHKTBase, SelectedFields } from "drizzle-orm/mysql-core";
import { SelectResultFields } from "drizzle-orm/query-builders/select.types";

//#region src/generated/mysql/withoutFrom.d.ts
declare module 'drizzle-orm/mysql-core' {
  interface MySqlSelectBuilder<TSelection extends SelectedFields | undefined, TPreparedQueryHKT extends PreparedQueryHKTBase, TBuilderMode extends 'db' | 'qb'> {
    withoutFrom(): TSelection extends SelectedFields ? MySqlSelectWithoutFrom<TSelection> : never;
  }
}
type MySqlSelectBuilderPrivate = {
  fields: ColumnsSelection;
  session?: MySqlSession;
  dialect: MySqlDialect;
  withList: Subquery[];
  distinct?: boolean | {
    on: (MySqlColumn | SQLWrapper)[];
  };
};
declare class MySqlSelectWithoutFrom<TSelection extends SelectedFields> extends TypedQueryBuilder<TSelection, SelectResultFields<TSelection>[]> implements MySqlSetOperatorWithResult<SelectResultFields<TSelection>[]> {
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
  constructor(select: MySqlSelectBuilderPrivate, selectedFields: TSelection);
  getSQL(): SQL<unknown>;
  private _prepare;
}
interface MySqlSelectWithoutFrom<TSelection extends SelectedFields> extends QueryPromise<SelectResultFields<TSelection>[]> {
  execute(): Promise<SelectResultFields<TSelection>[]>;
}
//#endregion
export { MySqlSelectWithoutFrom };