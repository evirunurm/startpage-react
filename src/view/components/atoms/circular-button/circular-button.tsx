import { Button as ButtonAria, ButtonProps } from "react-aria-components";
import styles from "./circular-button.module.css";

interface CircularButtonProps extends ButtonProps {
  className?: string;
}

export const CircularButton: React.FC<CircularButtonProps> = ({
  children,
  className = '',
  ...props
}) => (
  <ButtonAria className={`${styles["circular-button"]} ${className}`} {...props}>
    {children}
  </ButtonAria>
);