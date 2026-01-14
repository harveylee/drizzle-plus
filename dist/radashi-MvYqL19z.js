//#region node_modules/.pnpm/radashi@12.6.0/node_modules/radashi/dist/radashi.js
function select(array, mapper, condition) {
	if (!array) return [];
	let mapped;
	return array.reduce((acc, item, index) => {
		if (condition) condition(item, index) && acc.push(mapper(item, index));
		else if ((mapped = mapper(item, index)) != null) acc.push(mapped);
		return acc;
	}, []);
}
var QuantityParser = class {
	constructor({ units, short }) {
		this.units = units;
		this.short = short;
	}
	/**
	* Parse a quantity string into its numeric value
	*
	* @throws {Error} If the quantity string is invalid or contains an unknown unit
	*/
	parse(quantity) {
		var _a;
		const match = quantity.match(/^(-?\d+(?:\.\d+)?) ?(\w+)?s?$/);
		if (!match) throw new Error(`Invalid quantity, cannot parse: ${quantity}`);
		let unit = match[2];
		unit = ((_a = this.short) == null ? void 0 : _a[unit]) || unit;
		const count = Number.parseFloat(match[1]);
		if (Math.abs(count) > 1 && unit.endsWith("s")) unit = unit.substring(0, unit.length - 1);
		if (!this.units[unit]) throw new Error(`Invalid unit: ${unit}, makes sure it is one of: ${Object.keys(this.units).join(", ")}`);
		return count * this.units[unit];
	}
};
var _DurationParser = class _DurationParser$1 extends QuantityParser {
	constructor(options) {
		super({
			units: {
				..._DurationParser$1.units,
				...options == null ? void 0 : options.units
			},
			short: {
				..._DurationParser$1.shortUnits,
				...options == null ? void 0 : options.short
			}
		});
	}
};
_DurationParser.units = {
	week: 6048e5,
	day: 864e5,
	hour: 36e5,
	minute: 6e4,
	second: 1e3,
	millisecond: 1
};
_DurationParser.shortUnits = {
	w: "week",
	d: "day",
	h: "hour",
	m: "minute",
	s: "second",
	ms: "millisecond"
};
function isDate(value) {
	return isTagged(value, "[object Date]");
}
function isFunction(value) {
	return typeof value === "function";
}
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null || Object.getPrototypeOf(prototype) === null;
}
function isTagged(value, tag) {
	return Object.prototype.toString.call(value) === tag;
}

//#endregion
export { isDate, isFunction, isPlainObject, select };