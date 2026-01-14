import { jsonObject } from "../../jsonObject-D4wUSdJR.js";
import "../../types-Cy4S5lN-.js";
import { sql } from "drizzle-orm";
import { sql as sql$1 } from "drizzle-orm/sql";
import { createJsonArrayDecoder, getDecoder } from "drizzle-plus/utils";

//#region src/generated/mysql/cast.ts
/**
* Cast a value to a specific type.
*
* ⚠️ Never pass user input as the `type` argument unless you've thoroughly
* validated it.
*/
function cast(value, type) {
	return sql$1`cast(${value} as ${sql$1.raw(type)})`;
}

//#endregion
//#region src/generated/mysql/concat.ts
/**
* Concatenates two or more strings. If one of the arguments is null, the result
* is null.
*
* @param args - The strings to concatenate.
* @returns The concatenated string.
*/
function concat(...args) {
	return sql`concat(${sql.join(args.map((arg) => arg === null || typeof arg === "string" ? sql`${arg}` : arg), sql`, `)})`;
}

//#endregion
//#region src/generated/mysql/jsonArrayAgg.ts
/**
* Create a `json_arrayagg()` expression from a given value.
*/
function jsonArrayAgg(value) {
	return sql`json_arrayagg(${value})`.mapWith(createJsonArrayDecoder(getDecoder(value)));
}

//#endregion
//#region src/generated/mysql/position.ts
/**
* Performs a **case-insensitive** search for the first occurrence of a
* substring in a string.
*
* @param substring - The substring to search for.
* @param string - The string to search in.
* @returns The 1-based offset of the first occurrence of the substring in the
* string, or `0` if the substring is not found.
*/
function position(substring, string) {
	return sql`position(${substring} in ${string})`;
}

//#endregion
export { cast, concat, jsonArrayAgg, jsonObject, position };