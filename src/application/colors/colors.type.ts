import Colors from "@domain/colors/Colors";

export default interface IColorsFactory {
	getDefaultColors: () => Colors;
	updateCSSVariables: (colors: Colors) => void;
}