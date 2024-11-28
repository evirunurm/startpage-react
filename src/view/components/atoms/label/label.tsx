import { Label as LabelAria, LabelProps } from "react-aria-components";
import styles from "./label.module.css";

export const Label = ({ className, ...props }: LabelProps) => (
    <LabelAria className={`${className} ${styles.label}`} {...props} />
);