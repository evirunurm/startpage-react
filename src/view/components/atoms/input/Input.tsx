import { Input as InputAria } from "react-aria-components";

interface InputProps {
	name: string;
	type: string;
	placeholder?: string;
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({ ...props }: InputProps) => {
	return <InputAria {...props} />;
};
