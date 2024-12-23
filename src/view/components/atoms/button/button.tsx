import { Button as ButtonAria, ButtonProps, TooltipTrigger } from "react-aria-components";
import styles from "./button.module.css";
import { ToolTip } from "../tooltip/tooltip";

interface CustomButtonProps extends ButtonProps {
	className?: string;
	padding?: string;
	center?: boolean;
	tooltip?: string;
	tooltipPlacement?: 'start' | 'top' | 'bottom' | 'end';
}

export const Button: React.FC<CustomButtonProps> = ({
	children,
	className = '',
	padding = '',
	center = false,
	tooltip,
	tooltipPlacement,
	...props
}) => {

	return (
		<TooltipTrigger
			delay={800}
			closeDelay={0}
		>
			<ButtonAria
				className={`${styles.button} ${className}`}
				style={{
					padding,
					textAlign: center ? 'center' : 'left'
				}}
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
};