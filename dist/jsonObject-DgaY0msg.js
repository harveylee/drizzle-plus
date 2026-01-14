import { buildJsonProperties, createJsonObjectDecoder } from "./utils-Brc9vC7H.js";
import { sql } from "drizzle-orm";

//#region src/generated/mysql/jsonObject.ts
/**
* Build a JSON object from the selected fields of a given subquery. You may
* pass a plain object instead, in which case its values can be any valid SQL
* expression.
*/
function jsonObject(subquery) {
	const decoders = /* @__PURE__ */ new Map();
	const properties = buildJsonProperties(subquery, decoders);
	return sql`json_object(${properties})`.mapWith(createJsonObjectDecoder(decoders));
}

//#endregion
export { jsonObject };