import { Button as ButtonAria } from 'react-aria-components';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button = ({
  label,
  ...props
}: ButtonProps) => {
  return (
    <ButtonAria
      type="button"
      {...props}
    >
      {label}
    </ButtonAria>
  );
};
