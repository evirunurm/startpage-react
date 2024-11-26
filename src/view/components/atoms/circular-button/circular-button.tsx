import { Button as ButtonAria, ButtonProps, TooltipTrigger } from "react-aria-components";
import styles from "./circular-button.module.css";
import { ToolTip } from "../tooltip/tooltip";

interface CircularButtonProps extends ButtonProps {
	className?: string;
	tooltip?: string;
	tooltipPlacement?: 'start' | 'top' | 'bottom' | 'end';
}

export const CircularButton: React.FC<CircularButtonProps> = ({
	children,
	className = '',
	tooltip,
	tooltipPlacement,
	...props
}) => (
	<TooltipTrigger
		delay={800}
		closeDelay={0}
	>
		<ButtonAria
			className={`${styles["circular-button"]} ${className}`}
			{...props}
		>
			{children}
		</ButtonAria>
		{!tooltip ? null :
			<ToolTip
				placement={tooltipPlacement}
				text={tooltip}
			/>
		}
	</TooltipTrigger>
);