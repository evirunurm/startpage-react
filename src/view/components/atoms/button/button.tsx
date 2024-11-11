import { Button as ButtonAria, ButtonProps } from "react-aria-components";
import styles from "./button.module.css";

export const Button = ({
	children,
	className,
	...props
}: React.PropsWithChildren<ButtonProps>) => {
	return (
		<ButtonAria className={`${styles.button} ${className}`} {...props}>
			{children}
		</ButtonAria>
	);
};
