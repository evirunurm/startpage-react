import { ColorPicker as ColorPickerAria, ColorPickerProps as ColorPickerAriaProps, Dialog, DialogTrigger, Popover } from "react-aria-components";
import { Button } from "../button/button";
import { ColorArea } from "./color-area/color-area";
import { ColorSwatch } from "./color-swatch/color-swatch";
import { ColorSlider } from "./color-slider/color-slider";
import { ColorField } from "./color-field/color-field";
import styles from "./color-picker.module.css";

interface ColorPickerProps extends ColorPickerAriaProps {
	label: string;
	onOpenChange?: (isOpen: boolean) => void;
}

export const ColorPicker = ({
	label,
	onOpenChange,
	...props
}: ColorPickerProps) => (
	<ColorPickerAria {...props}>
		<DialogTrigger
			onOpenChange={onOpenChange}
		>
			<Button className={styles["color-picker"]}>
				<ColorSwatch />
				<span>{label}</span>
			</Button>
			<Popover placement="bottom start">
				<Dialog className={styles["color-picker-dialog"]}>
					<ColorArea
						colorSpace="hsl"
						xChannel="saturation"
						yChannel="lightness"
					/>
					<ColorSlider label="Hue" colorSpace="hsl" channel="hue" />
					<ColorField label="Hex" />
				</Dialog>
			</Popover>
		</DialogTrigger>
	</ColorPickerAria>
);