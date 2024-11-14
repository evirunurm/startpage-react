import { Button as ButtonAria, ButtonProps } from "react-aria-components";
import styles from "./button.module.css";

interface CustomButtonProps extends ButtonProps {
  className?: string;
}

export const Button: React.FC<CustomButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <ButtonAria className={`${styles.button} ${className}`} {...props}>
    {children}
  </ButtonAria>
);