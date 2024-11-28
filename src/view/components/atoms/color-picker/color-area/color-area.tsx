import { ColorArea as ColorAreaAria, ColorAreaProps } from "react-aria-components";
import { ColorThumb } from "../color-thumb/color-thumb";
import styles from "./color-area.module.css";

export const ColorArea = ({ ...props }: ColorAreaProps) => (
	<ColorAreaAria
		className={styles.area}
		{...props}
	>
		<ColorThumb />
	</ColorAreaAria>
);