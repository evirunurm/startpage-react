import { Label } from "@components/atoms/label/label";
import { ColorSlider as ColorSliderAria, ColorSliderProps as ColorSliderAriaProps, SliderOutput, SliderTrack } from "react-aria-components";
import styles from "./color-slider.module.css";
import { ColorThumb } from "../color-thumb/color-thumb";

interface ColorSliderProps extends ColorSliderAriaProps {
	label?: string;
}

export const ColorSlider = ({ label, ...props }: ColorSliderProps) => (
	<ColorSliderAria
		className={styles.slider}
		{...props}
	>
		<Label className={styles.slider__label}>{label}</Label>
		<SliderOutput className={styles.slider__output} />
		<SliderTrack
			className={styles.slider__track}
		// style={({ defaultStyle }) => ({
		//     background: `${defaultStyle.background},
		//         repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
		// })}
		>
			<ColorThumb className={styles.slider__thumb} />
		</SliderTrack>
	</ColorSliderAria>
);