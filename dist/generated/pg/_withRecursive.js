import "../../radashi-MvYqL19z.js";
import { setWithSubqueryAddons } from "../../internal-CfVT0bfO.js";
import { Name, SQL, StringChunk, Subquery } from "drizzle-orm";
import { mapSelectedFieldsToDecoders, orderSelectedFields } from "drizzle-plus/utils";
import { PgDatabase } from "drizzle-orm/pg-core";

//#region src/generated/pg/$withRecursive.ts
PgDatabase.prototype.$withRecursive = function(alias) {
	const db = this;
	return { as(qb) {
		let decoders;
		const subquery = qb(createRecursiveSelection(alias, (value, prop) => {
			const decoder = decoders[prop];
			return decoder ? decoder.mapFromDriverValue(value) : value;
		}));
		const fields = subquery.getSelectedFields();
		const orderedFields = orderSelectedFields(fields);
		decoders = mapSelectedFieldsToDecoders(orderedFields);
		return setWithSubqueryAddons(db.$with(alias).as(subquery), { recursive: true });
	} };
};
function createRecursiveSelection(alias, decoder) {
	const aliasName = new Name(alias);
	return new Proxy(new Subquery(new SQL([aliasName]), {}, alias, true), { get(subquery, prop) {
		if (prop === "_") return subquery[prop];
		return new SQL([
			aliasName,
			new StringChunk("."),
			new Name(prop)
		]).mapWith((value) => decoder(value, prop));
	} });
}

//#endregion