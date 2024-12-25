import React, { useContext, useEffect } from "react";
import { Article } from "@components/atoms/article/article";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import Colors from "@domain/colors/Colors";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { ColorPicker } from "@components/atoms/color-picker/color-picker";
import { Color } from "react-aria-components";
import ColorsContext from "@context/colors-context";
import { Disclosure } from "@components/atoms/disclosure/disclosure";
import { useTranslation } from "react-i18next";
import ColorsFactory from "@application/colors/colors.factory";

export const ColorsSettings: React.FC = () => {
	const { t } = useTranslation();
	const [, setStoredColors] = useLocalStorageState<Colors>(LocalStorageType.Colors);
	const { colors, setColors } = useContext(ColorsContext);
	const { getDefaultColors } = ColorsFactory();

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
			setColors(getDefaultColors());
		}
	}, [colors, setColors, getDefaultColors]);

	return (
		<Disclosure title={t("colors.color-theme")} wide>
			<Article>
				{
					colors && Object.keys(colors)
						.map((key: string) => (
							<ColorPicker
								onOpenChange={handleOpenChange}
								onChange={handleColorChange(key)}
								label={t(`colors.${key}`)}
								key={key}
								defaultValue={colors[key as keyof Colors]}
							/>
						))
				}
			</Article>
		</Disclosure>
	);
}