import { Button as ButtonAria, ButtonProps } from "react-aria-components";
import styles from "./circular-button.module.css";

export const CircularButton = ({
	children,
	className,
	...props
}: React.PropsWithChildren<ButtonProps>) => {
	return (
		<ButtonAria className={`${styles["ciruclar-button"]} ${className}`} {...props}>
			{children}
		</ButtonAria>
	);
};
