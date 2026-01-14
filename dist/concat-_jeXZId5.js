import { sql } from "drizzle-orm";

//#region src/generated/pg/concat.ts
/**
* Concatenates two or more strings. If an argument is null, it's treated as an
* empty string.
*
* @param args - The strings to concatenate.
* @returns The concatenated string.
*/
function concat(...args) {
	return sql`concat(${sql.join(args.map((arg) => arg === null || typeof arg === "string" ? sql`${arg}` : arg), sql`, `)})`;
}

//#endregion
export { concat };