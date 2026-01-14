//#region src/types/json.d.ts
/**
 * Any JSON-native primitive value.
 */
type JSONPrimitive = string | number | boolean | null;
/**
 * Any object that can be serialized to a JSON object. This includes
 * complex objects that implement the `toJSON` method.
 */
type JSONObjectCodable = {
  [key: string]: JSONCodable | undefined;
} | {
  toJSON(): JSONObject;
};
/**
 * Any value that can be serialized to JSON. This includes complex objects
 * that implement the `toJSON` method.
 */
type JSONCodable = JSONPrimitive | {
  [key: string]: JSONCodable | undefined;
} | {
  toJSON(): JSON;
} | readonly JSONCodable[];
/**
 * Any JSON-native object.
 */
type JSONObject = {
  [key: string]: JSON | undefined;
};
/**
 * Any JSON-native value.
 */
type JSON = JSONPrimitive | JSONObject | readonly JSON[];
//#endregion
export { JSON, JSONCodable, JSONObject, JSONObjectCodable, JSONPrimitive };