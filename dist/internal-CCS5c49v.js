import { isFunction, pushStringChunk, select } from "./utils-Brc9vC7H.js";
import { Name, SQL, StringChunk, WithSubquery, relationsFilterToSQL, sql } from "drizzle-orm";
import { PgDialect, getTableConfig } from "drizzle-orm/pg-core";
import { SelectionProxyHandler } from "drizzle-orm/selection-proxy";

//#region src/generated/pg/internal.ts
function getContext(rqb) {
	return rqb;
}
function getFilterSQL(rqb, filter) {
	const ctx = getContext(rqb);
	return relationsFilterToSQL(ctx.table, filter, ctx.tableConfig.relations, ctx.schema, ctx.tableNamesMap, ctx.dialect.casing);
}
function getReturningFields(returning, columns) {
	if (isFunction(returning)) {
		returning = returning(columns);
		if (returning === columns) return returning;
	}
	const keys = Object.keys(returning).filter((key) => returning[key] !== void 0);
	if (!keys.length) return null;
	const selectedFields = {};
	if (keys.some((key) => returning[key] !== false)) for (const key of keys) {
		if (returning[key] === false) continue;
		selectedFields[key] = returning[key] === true ? columns[key] : returning[key];
	}
	else {
		const omittedKeys = keys;
		for (const key in columns) if (!omittedKeys.includes(key)) selectedFields[key] = columns[key];
		if (!Object.keys(selectedFields).length) return null;
	}
	return selectedFields;
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
function injectWithSubqueryAddons(withBuilder, addons, transform) {
	const originalMethod = withBuilder.as;
	withBuilder.as = function(arg) {
		const withSubquery = originalMethod(transform ? transform(arg) : arg);
		return setWithSubqueryAddons(withSubquery, addons);
	};
	return withBuilder;
}
function setWithSubqueryAddons(withSubquery, addons) {
	if (!withSubqueryAddons) {
		withSubqueryAddons = /* @__PURE__ */ new WeakMap();
		PgDialect.prototype.buildWithCTE = buildWithCTE;
	}
	withSubqueryAddons.set(withSubquery, addons);
	return withSubquery;
}
function excluded(name) {
	return sql`excluded.${sql.identifier(name)}`;
}
const sqlNull = sql`null`;
function buildInsertSelect(selectedFields, columns, isRelationalQuery) {
	const values = {};
	for (const key in columns) if (selectedFields[key] !== void 0) values[key] = isRelationalQuery ? sql.identifier(key) : selectedFields[key];
	else {
		const column = columns[key];
		if (column.hasDefault || column.generated || column.generatedIdentity) throw new Error(`Column "${key}" cannot be undefined for an INSERT…SELECT query, because of a bug in Drizzle that always includes generated/optional columns in the column list: https://github.com/drizzle-team/drizzle-orm/issues/3971`);
		values[key] = sqlNull;
	}
	return values;
}
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
export { buildInsertSelect, buildRelationalQuery, createWithSubquery, excluded, getContext, getFilterSQL, getReturningFields, getTargetColumns, injectWithSubqueryAddons, setWithSubqueryAddons };