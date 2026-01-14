import "./json-yDXowxm9.js";
import { AnyDialect, AnyQuery, AnySelectQuery, DecodedFields, SQLExpression } from "./types-BGX1maf_.js";
import { BuildRelationalQueryResult, Column, DriverValueDecoder, QueryPromise, SQL, SQLChunk, SelectedFieldsOrdered, Table } from "drizzle-orm";

//#region src/utils.d.ts
/**
 * Returns the name of a table, before it was aliased.
 */
declare function getOriginalTableName<T extends Table>(table: T): T['_']['config']['name'];
declare function getSelectedFields(query: AnyQuery): Record<string, unknown>;
declare function getDecoder<T>(value: SQLExpression<T>): DriverValueDecoder<T, any>;
declare function getSQL(value: AnyQuery): SQL;
declare function getDialect(value: AnyQuery): AnyDialect;
declare function buildRelationalQuery(value: QueryPromise<any>): BuildRelationalQueryResult;
declare function createJsonArrayDecoder<T>(itemDecoder: DriverValueDecoder<T, any>): (result: unknown) => any[];
declare function buildJsonProperties(input: AnySelectQuery | Record<string, unknown>, decoders?: Map<string, DriverValueDecoder<any, any>>): SQL;
declare function createJsonObjectDecoder<T>(propertyDecoders: Map<string, DriverValueDecoder<any, any>>): (result: unknown) => T;
declare function getDefinedColumns<TColumn extends Column>(columns: Record<string, TColumn>, data: any[]): Record<string, TColumn>;
declare function pushStringChunk(chunks: SQLChunk[], sql: string): void;
declare function orderSelectedFields<TColumn extends Column>(fields: Record<string, unknown>, pathPrefix?: string[]): SelectedFieldsOrdered<TColumn>;
declare function mapSelectedFieldsToDecoders<TColumn extends Column>(orderedFields: SelectedFieldsOrdered<TColumn>): DecodedFields;
//#endregion
export { buildJsonProperties, buildRelationalQuery, createJsonArrayDecoder, createJsonObjectDecoder, getDecoder, getDefinedColumns, getDialect, getOriginalTableName, getSQL, getSelectedFields, mapSelectedFieldsToDecoders, orderSelectedFields, pushStringChunk };