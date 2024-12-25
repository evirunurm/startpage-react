import Colors from "@domain/colors/Colors";
import IColorsFactory from "./colors.type";
import DEFAULT_COLORS from "./default-colors";

export default function ColorsFactory(): IColorsFactory {

	const getDefaultColors = () => DEFAULT_COLORS;

	const updateCSSVariables = (colors: Colors) => {
		Object.keys(colors).forEach((color: string) => {
			document.documentElement.style.setProperty(`--${color}`, colors[color as keyof Colors]);
		});
	}

	return {
		getDefaultColors,
		updateCSSVariables
	};
}
