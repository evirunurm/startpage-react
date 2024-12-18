import { Input } from '@components/atoms/input/input';
import { Label } from '@components/atoms/label/label';
import type { ColorFieldProps as ColorFieldAriaProps, ValidationResult } from 'react-aria-components';
import { FieldError, ColorField as ColorFieldAria } from 'react-aria-components';

interface ColorFieldProps extends ColorFieldAriaProps {
	label?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
}

export function ColorField(
	{ label, errorMessage, ...props }: ColorFieldProps
) {
	return (
		<ColorFieldAria {...props}>
			{label &&
				<Label>{label}</Label>
			}
			<Input />
			<FieldError>{errorMessage}</FieldError>
		</ColorFieldAria>
	);
}