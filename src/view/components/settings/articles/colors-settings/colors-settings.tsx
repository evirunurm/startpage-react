import React, { useContext, useEffect } from "react";
import { Article } from "@components/atoms/article/article";
import { useLocalStorageState } from "@utils/utils";
import Colors from "@domain/colors/Colors";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import { ColorPicker } from "@components/atoms/color-picker/color-picker";
import { Color } from "react-aria-components";
import ColorsContext from "@context/colors-context";

export const ColorsSettings: React.FC = () => {
	const [, setStoredColors] = useLocalStorageState<Colors>(LocalStorageType.Colors);
	const { colors, setColors } = useContext(ColorsContext);

	const handleColorChange = (key: string) => {
		return (color: Color) => {
			const hexColorValue: string = color.toString('hex');
			setColors({ ...colors, [key]: hexColorValue } as Colors);
		}
	}

	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen) {
			setStoredColors(colors)
		}
	}

	useEffect(() => {
		if (colors === null) {
			const defaultColors: Colors = {
				"color-primary": "#007bff",
				"color-secondary": "#6c757d",
				"color-background": "#f8f9fa",
				"color-font": "#343a40",
			}
			setColors(defaultColors);
		}
	}, [colors, setColors]);

	return (
		<Article title="Colors">
			{
				colors && Object.keys(colors)
					.map((key: string) => (
						<ColorPicker
							onOpenChange={handleOpenChange}
							onChange={handleColorChange(key)}
							label={key}
							key={key}
							defaultValue={colors[key as keyof Colors]}
						/>
					))
			}
		</Article>
	);
}