export function getEnumArray<
	T extends string,
	TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
	return Object.keys(enumVariable)
		.filter((key) => isNaN(Number(key)))
		.map((key) => ({
			key,
			value: enumVariable[key as T],
		}));
}

export function generateUniqueId() {
	return Math.random().toString(36).slice(2, 16);
}
