import { isFunction, select } from "../../radashi-MvYqL19z.js";
import { buildInsertSelect, createWithSubquery, excluded, getContext, getReturningFields, getTargetColumns } from "../../internal-CfVT0bfO.js";
import { QueryPromise, Subquery, getTableColumns, relationsFilterToSQL } from "drizzle-orm";
import { TypedQueryBuilder } from "drizzle-orm/query-builders/query-builder";
import { getDefinedColumns, getSQL, getSelectedFields, mapSelectedFieldsToDecoders, orderSelectedFields } from "drizzle-plus/utils";
import { PgInsertBuilder, QueryBuilder } from "drizzle-orm/pg-core";
import { PgRelationalQuery, RelationalQueryBuilder } from "drizzle-orm/pg-core/query-builders/query";

//#region src/generated/pg/upsert.ts
RelationalQueryBuilder.prototype.upsert = function(config) {
	const { table, dialect, session } = getContext(this);
	const columns = getTableColumns(table);
	const qb = new PgInsertBuilder(table, session, dialect, config.with);
	let selection;
	let query;
	if (isFunction(config.data) || config.data instanceof TypedQueryBuilder) {
		const data = isFunction(config.data) ? config.data(new QueryBuilder()) : config.data;
		selection = data.config.fields;
		data.config.fields = buildInsertSelect(selection, columns);
		data._.selectedFields = data.config.fields;
		query = qb.select(data);
	} else if (config.data instanceof PgRelationalQuery || config.data instanceof Subquery) {
		selection = getSelectedFields(config.data);
		query = qb.select((qb$1) => {
			return qb$1.select(buildInsertSelect(selection, columns, true)).from(getSQL(config.data));
		});
	} else query = qb.values(config.data);
	const targetCandidates = getDefinedColumns(columns, [selection || (Array.isArray(config.data) ? config.data[0] : config.data)]);
	let target = config.target?.map((column) => columns[column]);
	if (!target) {
		target = getTargetColumns(table, Object.values(targetCandidates));
		if (!target) throw new Error("No matching primary key or unique constraint found");
	}
	const updateCandidates = Array.isArray(config.data) ? getDefinedColumns(columns, config.data) : targetCandidates;
	const update = config.update && config.update({
		current: columns,
		excluded: new Proxy(updateCandidates, { get(_, prop) {
			const column = updateCandidates[prop];
			if (column) {
				const name = dialect.casing.getColumnCasing(column);
				return excluded(name);
			}
		} })
	});
	const updatedEntries = update ? Object.entries(update).filter(([_, value]) => value !== void 0) : select(Object.keys(updateCandidates), (key) => {
		const column = columns[key];
		if (target.includes(column)) return null;
		const name = dialect.casing.getColumnCasing(column);
		return [key, excluded(name)];
	});
	const returning = config.returning ? getReturningFields(config.returning, columns) : columns;
	if (returning && updatedEntries.length === 0) {
		const name = dialect.casing.getColumnCasing(target[0]);
		updatedEntries.push([target[0].name, excluded(name)]);
	}
	if (updatedEntries.length > 0) query.onConflictDoUpdate({
		target,
		set: Object.fromEntries(updatedEntries),
		setWhere: config.updateWhere && relationsFilterToSQL(table, config.updateWhere)
	});
	else query.onConflictDoNothing();
	if (returning) query.returning(returning);
	return new UpsertQueryPromise(query, returning, !selection && !Array.isArray(config.data));
};
var UpsertQueryPromise = class extends QueryPromise {
	constructor(query, returning, first) {
		super();
		this.query = query;
		this.returning = returning;
		this.first = first;
	}
	execute() {
		return this.first ? this.query.then((results) => results[0]) : this.query;
	}
	getSQL() {
		return this.query.getSQL();
	}
	toSQL() {
		return this.query.toSQL();
	}
	as(alias) {
		const orderedFields = orderSelectedFields(this.returning);
		return createWithSubquery(this.getSQL(), alias, mapSelectedFieldsToDecoders(orderedFields));
	}
};

//#endregion
export { UpsertQueryPromise };