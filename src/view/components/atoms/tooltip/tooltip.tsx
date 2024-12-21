import { OverlayArrow, Tooltip as TooltipAria, TooltipProps as TooltipAriaProps } from "react-aria-components";

import styles from "./tooltip.module.css";
import { IconTriangleInvertedFilled } from "@tabler/icons-react";

interface TooltipProps extends TooltipAriaProps {
	text: string;
}

export const ToolTip: React.FC<TooltipProps> = ({
	text,
	className,
	...props
}) => (
	<TooltipAria
		{...props}
		className={`${styles.tooltip} ${className}`}
	>
		<OverlayArrow
			className={styles["overlay-arrow"]}
		>
			<IconTriangleInvertedFilled size={14} />
		</OverlayArrow>
		{text}
	</TooltipAria>
);