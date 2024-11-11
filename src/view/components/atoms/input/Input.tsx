import { Input as InputAria, InputProps } from "react-aria-components";

export const Input = ({ ...props }: InputProps) => {
	return <InputAria {...props} />;
};