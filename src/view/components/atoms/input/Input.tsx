import { Input as InputAria, InputProps } from "react-aria-components";
import styles from "./input.module.css";

export const Input = ({ className, ...props }: InputProps) => (
    <InputAria className={`${className} ${styles.input}`} {...props} />
);