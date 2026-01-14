import { mapSelectedFieldsToDecoders, orderSelectedFields } from "../../utils-Brc9vC7H.js";
import { buildRelationalQuery, createWithSubquery } from "../../internal-uJGafNeM.js";
import { mapRelationalRow, sql } from "drizzle-orm";
import { MySqlRelationalQuery } from "drizzle-orm/mysql-core/query-builders/query";
import { MySqlSelectBuilder } from "drizzle-orm/mysql-core";

//#region src/generated/mysql/as.ts
MySqlRelationalQuery.prototype.as = function(alias) {
	const { sql: sql$1, selection } = buildRelationalQuery(this);
	const decodedFields = {};
	for (const item of selection) decodedFields[item.key] = { mapFromDriverValue(value) {
		return mapRelationalRow({ [item.key]: value }, [item])[item.key];
	} };
	return createWithSubquery(sql$1, alias, decodedFields);
};
MySqlSelectBuilder.prototype.as = function(alias) {
	const { fields, dialect } = this;
	if (!fields) throw new Error("Cannot alias a select query without a selection");
	const orderedFields = orderSelectedFields(fields);
	return createWithSubquery(sql`select ${dialect.buildSelection(orderedFields)}`, alias, mapSelectedFieldsToDecoders(orderedFields));
};

//#endregion