import { DropIndicatorProps, DropIndicator as DropIndicatorAria } from "react-aria-components";
import styles from "./drop-indicator.module.css";

export const DropIndicator = ({ className = '', ...props }: DropIndicatorProps) => (
	<DropIndicatorAria
		{...props}
		className={({ isDropTarget }) =>
			`${styles["drop-indicator"]} ${isDropTarget ? styles["active"] : ''} ${className}`}
	/>
);