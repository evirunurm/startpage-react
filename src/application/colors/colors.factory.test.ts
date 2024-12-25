import ColorsFactory from "./colors.factory";
import IColorsFactory from "./colors.type";

describe("ColorsFactory", () => {
	let colorsFactory: IColorsFactory;

	beforeEach(() => {
		colorsFactory = ColorsFactory();
	});

	it("should return the default colors", () => {
		const { getDefaultColors } = colorsFactory;

		expect(getDefaultColors()).toBeDefined();
	});

	it("should update the CSS variable for font color", () => {
		const newColor = "#000";
		const { getDefaultColors, updateCSSVariables } = colorsFactory;
		const colors = getDefaultColors();
		colors["color-font"] = newColor;

		updateCSSVariables(colors);

		const styles = window.getComputedStyle(document.documentElement);
		expect(styles.getPropertyValue("--color-font")).toBe(newColor);
	});

	it("should update the CSS variable for background color", () => {
		const newColor = "#000";
		const { getDefaultColors, updateCSSVariables } = colorsFactory;
		const colors = getDefaultColors();
		colors["color-background"] = newColor;

		updateCSSVariables(colors);

		const styles = window.getComputedStyle(document.documentElement);
		expect(styles.getPropertyValue("--color-background")).toBe(newColor);
	});

	it("should update the CSS variable for primary color", () => {
		const newColor = "#000";
		const { getDefaultColors, updateCSSVariables } = colorsFactory;
		const colors = getDefaultColors();
		colors["color-primary"] = newColor;

		updateCSSVariables(colors);

		const styles = window.getComputedStyle(document.documentElement);
		expect(styles.getPropertyValue("--color-primary")).toBe(newColor);
	});

});
