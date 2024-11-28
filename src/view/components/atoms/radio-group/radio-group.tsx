import { RadioGroup as RadioGroupAria, RadioGroupProps } from "react-aria-components";
import styles from './radio-group.module.css';

interface CustomRadioGroupProps extends RadioGroupProps {
    className?: string;
}

export const RadioGroup: React.FC<CustomRadioGroupProps> = ({
    className = '',
    children,
    ...props
}) => (
    <RadioGroupAria
        className={`${styles["radio-group"]} ${className}`}
        {...props}
    >
        {children}
    </RadioGroupAria>
);