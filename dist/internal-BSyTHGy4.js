import { select } from "./radashi-MvYqL19z.js";
import { Name, SQL, StringChunk, WithSubquery, relationsFilterToSQL, sql } from "drizzle-orm";
import { pushStringChunk } from "drizzle-plus/utils";
import { SelectionProxyHandler } from "drizzle-orm/selection-proxy";
import { MySqlDialect, getTableConfig } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/internal.ts
function getContext(rqb) {
	return rqb;
}
function getFilterSQL(rqb, filter) {
	const ctx = getContext(rqb);
	return relationsFilterToSQL(ctx.table, filter, ctx.tableConfig.relations, ctx.schema, ctx.tableNamesMap, ctx.dialect.casing);
}
const getTableConfigMemoized = memoByFirstArgument((table) => {
	const { primaryKeys, uniqueConstraints, indexes } = getTableConfig(table);
	const uniqueIndexes = indexes.filter((index) => index.config.unique);
	return {
		primaryKeys,
		uniqueConstraints,
		uniqueIndexes
	};
});
function getTargetColumns(table, columns) {
	const uniqueColumn = columns.find((column) => column.primary) || columns.find((column) => column.isUnique);
	if (uniqueColumn) return [uniqueColumn];
	const { primaryKeys, uniqueConstraints, uniqueIndexes } = getTableConfigMemoized(table);
	if (primaryKeys[0]) {
		const target = select(primaryKeys[0].columns, (targetColumn) => columns.find((column) => column.name === targetColumn.name));
		if (target.length === primaryKeys[0].columns.length) return target;
	}
	for (const uniqueConstraint of uniqueConstraints) {
		const target = select(uniqueConstraint.columns, (targetColumn) => columns.find((column) => column.name === targetColumn.name));
		if (target.length === uniqueConstraint.columns.length) return target;
	}
	for (const uniqueIndex of uniqueIndexes) {
		const target = select(uniqueIndex.config.columns, (targetColumn) => "name" in targetColumn ? columns.find((column) => column.name === targetColumn.name) : void 0);
		if (target.length === uniqueIndex.config.columns.length) return target;
	}
}
function memoByFirstArgument(func) {
	const cache = /* @__PURE__ */ new Map();
	return (...args) => {
		if (cache.has(args[0])) return cache.get(args[0]);
		const result = func(...args);
		cache.set(args[0], result);
		return result;
	};
}
let withSubqueryAddons;
const getWithSubqueryAddons = (withSubquery) => withSubqueryAddons.get(withSubquery) || {};
function buildWithCTE(queries) {
	if (!queries?.length) return;
	const chunks = [new StringChunk("with ")];
	if (queries.some((query) => getWithSubqueryAddons(query).recursive)) chunks.push(new StringChunk("recursive "));
	for (let i = 0; i < queries.length; i++) {
		const { alias, sql: subquery } = queries[i]._;
		chunks.push(new Name(alias));
		const addons = getWithSubqueryAddons(queries[i]);
		if (addons.columns) {
			pushStringChunk(chunks, " (");
			for (let i$1 = 0; i$1 < addons.columns.length; i$1++) {
				const column = addons.columns[i$1];
				if (i$1 > 0) pushStringChunk(chunks, ", ");
				chunks.push(new Name(column));
			}
			pushStringChunk(chunks, ")");
		}
		pushStringChunk(chunks, " as ");
		if (addons.materialized) pushStringChunk(chunks, "materialized ");
		else if (addons.materialized === false) pushStringChunk(chunks, "not materialized ");
		pushStringChunk(chunks, "(");
		chunks.push(subquery);
		pushStringChunk(chunks, ")");
		if (i < queries.length - 1) pushStringChunk(chunks, ", ");
	}
	pushStringChunk(chunks, " ");
	return new SQL(chunks);
}
function setWithSubqueryAddons(withSubquery, addons) {
	if (!withSubqueryAddons) {
		withSubqueryAddons = /* @__PURE__ */ new WeakMap();
		MySqlDialect.prototype.buildWithCTE = buildWithCTE;
	}
	withSubqueryAddons.set(withSubquery, addons);
	return withSubquery;
}
const sqlNull = sql`null`;
/**
* Hooks into the private `_getQuery` method to retrieve the selection array
* used to map the result rows.
*/
function buildRelationalQuery(query) {
	return query._getQuery();
}
function createWithSubquery(query, alias, decodedFields) {
	const selection = {};
	for (const name in decodedFields) selection[name] = sql`${sql.identifier(alias)}.${sql.identifier(name)}`.mapWith(decodedFields[name]);
	return new Proxy(new WithSubquery(query, selection, alias, true), new SelectionProxyHandler({
		alias,
		sqlBehavior: "sql"
	}));
}

//#endregion
export { buildRelationalQuery, createWithSubquery, getContext, getFilterSQL, getTargetColumns, setWithSubqueryAddons };