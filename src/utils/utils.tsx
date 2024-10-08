export function getEnumKeys<
T extends string,
TEnumValue extends string | number,>
(enumVariable: { [key in T]: TEnumValue })
{
	const keysAndValues: string[] = Object.keys(enumVariable);
	const keys: number[] = keysAndValues
		.filter((key: number | string) => !isNaN(Number(key)))
		.map((key: string | number) => Number(key));
	return keys;
}

export function generateUnique() {
	return (Date.now() * Math.random()).toString();
}