import { Button as ButtonAria, ButtonProps } from "react-aria-components";

export const Button = ({
	children,
	...props
}: React.PropsWithChildren<ButtonProps>) => {
	return <ButtonAria {...props}>{children}</ButtonAria>;
};
