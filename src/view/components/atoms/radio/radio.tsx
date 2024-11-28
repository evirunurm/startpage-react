import { Radio as RadioAria, RadioProps } from "react-aria-components";
import styles from './radio.module.css';

interface CustomRadioProps extends RadioProps {
    className?: string;
}

export const Radio: React.FC<CustomRadioProps> = ({
    className = '',
    children,
    ...props
}) => (
    <RadioAria
        className={`${styles.radio} ${className}`}
        {...props}
    >
        {children}
    </RadioAria>
);