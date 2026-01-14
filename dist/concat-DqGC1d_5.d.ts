import { SQLValue } from "./types-BIurY8o2.js";
import { SQL } from "drizzle-orm";

//#region src/generated/pg/concat.d.ts

/**
 * Concatenates two or more strings. If an argument is null, it's treated as an
 * empty string.
 *
 * @param args - The strings to concatenate.
 * @returns The concatenated string.
 */
declare function concat(...args: SQLValue<string | null>[]): SQL<string>;
//#endregion
export { concat };