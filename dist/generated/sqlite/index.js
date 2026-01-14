import { concat } from "../../concat-0b3zcHef.js";
import { jsonObject } from "../../jsonObject-D4wUSdJR.js";
import "../../types-D670-rDz.js";
import { sql } from "drizzle-orm";
import { sql as sql$1 } from "drizzle-orm/sql";
import { createJsonArrayDecoder, getDecoder } from "drizzle-plus/utils";

//#region src/generated/sqlite/cast.ts
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
//#region src/generated/sqlite/instr.ts
/**
* Performs a **case-sensitive** search for the first occurrence of a substring
* in a string.
*
* @param string - The string to search in.
* @param substring - The substring to search for.
* @returns The 1-based offset of the first occurrence of the substring in the
* string, or `0` if the substring is not found.
*/
function instr(string, substring) {
	return sql`instr(${string}, ${substring})`;
}

//#endregion
//#region src/generated/sqlite/jsonGroupArray.ts
/**
* Create a `json_group_array()` expression from a given value.
*/
function jsonGroupArray(value) {
	return sql`json_group_array(${value})`.mapWith(createJsonArrayDecoder(getDecoder(value)));
}

//#endregion
export { cast, concat, instr, jsonGroupArray, jsonObject };