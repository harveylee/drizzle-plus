import { isDate, isPlainObject } from "./radashi-MvYqL19z.js";
import { Column, DrizzleError, QueryPromise, SQL, StringChunk, Table, getTableColumns, is, noopDecoder, sql } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";

//#region src/syntax/toSelection.ts
/**
* Coerce a plain object with JavaScript values to a `db.select()` selection
* object. Any objects within must be JSON-serializable.
*
* - `undefined` values are ignored
* - primitive values (including `null`) are wrapped with `sql` template
* - `Date` values are treated as ISO strings
* - subqueries and `SQL` objects are preserved
*/
function toSelection(fields, options) {
	const selection = {};
	for (const key in fields) {
		let value = fields[key];
		if (value === void 0) continue;
		if (value === null) value = sql`null`;
		else if (typeof value === "number" || typeof value === "boolean") value = sql.raw(String(value));
		else if (typeof value !== "object") {
			if (typeof value === "function") throw new DrizzleError({ message: "Function values are not allowed in a selection" });
			value = new SQL([value]);
		} else if (!is(value, SQL)) {
			if (is(value, Column) || is(value, SQL.Aliased)) {
				selection[key] = value;
				continue;
			}
			if (is(value, QueryPromise) || is(value, TypedQueryBuilder)) value = getSQL(value);
			else if (isDate(value)) value = new SQL([value.toISOString()]);
			else value = new SQL([JSON.stringify(value)]);
		}
		selection[key] = options?.addAliases ? value.as(key) : value;
	}
	return selection;
}

//#endregion
//#region src/utils.ts
/**
* Returns the name of a table, before it was aliased.
*/
function getOriginalTableName(table) {
	return table[Symbol.for("drizzle:OriginalName")];
}
function getSelectedFields(query) {
	if (query instanceof QueryPromise) {
		const { config, table } = query;
		return {
			...config.columns || getTableColumns(table),
			...config.with,
			...config.extras
		};
	}
	return query._.selectedFields;
}
function getDecoder(value) {
	let decoder;
	if (is(value, Column)) decoder = value;
	else if (is(value, SQL)) decoder = value.decoder;
	else if (is(value, SQL.Aliased)) decoder = value.sql.decoder;
	else decoder = value.getSQL().decoder;
	if ("mapFromJsonValue" in decoder && typeof decoder.mapFromJsonValue === "function") return { mapFromDriverValue: decoder.mapFromJsonValue.bind(decoder) };
	return decoder;
}
function getSQL(value) {
	return value.getSQL();
}
function getDialect(value) {
	return value.dialect;
}
function buildRelationalQuery(value) {
	const getQuery = value._getQuery;
	return getQuery.call(value);
}
function createJsonArrayDecoder(itemDecoder) {
	return (result) => {
		const items = typeof result === "string" ? JSON.parse(result) : result;
		return itemDecoder !== noopDecoder ? items.map((item) => itemDecoder.mapFromDriverValue(item)) : items;
	};
}
function buildJsonProperties(input, decoders) {
	const subquery = isPlainObject(input) ? null : input;
	const properties = sql.empty();
	let fields;
	let alias;
	if (isPlainObject(input)) fields = toSelection(input);
	else {
		fields = getSelectedFields(subquery);
		alias = subquery._.alias;
	}
	Object.entries(fields).forEach(([field, value], index) => {
		if (index > 0) properties.append(sql.raw(","));
		const sanitizedField = field.replace(/[^a-z0-9_-]/gi, "");
		properties.append(sql.raw(`'${sanitizedField}', `));
		if (is(value, Column) || is(value, SQL.Aliased)) properties.append(new SQL([value]));
		else if (alias) properties.append(sql`${sql.identifier(alias)}.${sql.identifier(sanitizedField)}`);
		else properties.append(value);
		if (decoders) {
			const decoder = getDecoder(value);
			if (decoder !== noopDecoder) decoders.set(field, decoder);
		}
	});
	return properties;
}
function createJsonObjectDecoder(propertyDecoders) {
	return (result) => {
		const object = typeof result === "string" ? JSON.parse(result) : result;
		for (const [key, decoder] of propertyDecoders) object[key] = decoder.mapFromDriverValue(object[key]);
		return object;
	};
}
function getDefinedColumns(columns, data) {
	const usedColumns = {};
	for (const key of Object.keys(columns)) for (const object of data) if (Object.hasOwn(object, key) && object[key] !== void 0) {
		usedColumns[key] = columns[key];
		break;
	}
	return usedColumns;
}
function pushStringChunk(chunks, sql$1) {
	const lastChunk = chunks.at(-1);
	if (lastChunk instanceof StringChunk) lastChunk.value.push(sql$1);
	else chunks.push(new StringChunk(sql$1));
}
function orderSelectedFields(fields, pathPrefix) {
	const result = [];
	for (const name in fields) {
		if (!Object.prototype.hasOwnProperty.call(fields, name)) continue;
		if (typeof name !== "string") continue;
		const field = fields[name];
		const newPath = pathPrefix ? [...pathPrefix, name] : [name];
		if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) result.push({
			path: newPath,
			field
		});
		else {
			const orderedFields = orderSelectedFields(is(field, Table) ? getTableColumns(field) : isPlainObject(field) ? field : {}, newPath);
			for (const field$1 of orderedFields) result.push(field$1);
		}
	}
	return result;
}
function mapSelectedFieldsToDecoders(orderedFields) {
	const decodedFields = Object.create(null);
	for (const { path, field } of orderedFields) {
		const name = is(field, SQL.Aliased) ? field.fieldAlias : path[path.length - 1];
		decodedFields[name] = getDecoder(field);
	}
	return decodedFields;
}

//#endregion
export { buildJsonProperties, buildRelationalQuery, createJsonArrayDecoder, createJsonObjectDecoder, getDecoder, getDefinedColumns, getDialect, getOriginalTableName, getSQL, getSelectedFields, mapSelectedFieldsToDecoders, orderSelectedFields, pushStringChunk, toSelection };