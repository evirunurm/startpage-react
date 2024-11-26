import { OverlayArrow, Tooltip as TooltipAria, TooltipProps as TooltipAriaProps } from "react-aria-components";

import styles from "./tooltip.module.css";
import { IconTriangleInvertedFilled } from "@tabler/icons-react";

interface TooltipProps extends TooltipAriaProps {
	text: string;
}

export const ToolTip: React.FC<TooltipProps> = ({
	text,
	...props
}) => (
	<TooltipAria
		{...props}
		className={styles.tooltip}
	>
		<OverlayArrow
			className={styles["overlay-arrow"]}
		>
			{/* <svg width={8} height={8} viewBox="0 0 8 8">
                <path d="M0 0 L4 4 L8 0" />
            </svg> */}

			<IconTriangleInvertedFilled size={14} />
		</OverlayArrow>
		{text}
	</TooltipAria>
);