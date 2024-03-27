import { Button as ButtonAria } from 'react-aria-components';

interface ButtonProps {
  backgroundColor?: string;
  label: string;
  onClick?: () => void;
}

export const Button = ({
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <ButtonAria
      type="button"
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </ButtonAria>
  );
};
