import { ColorThumb as ColorThumbAria, ColorThumbProps as ColorThumbAriaProps } from "react-aria-components";
import styles from "./color-thumb.module.css";

interface ColorThumbProps extends ColorThumbAriaProps {
    className?: string;
}

export const ColorThumb = ({ className = '', ...props }: ColorThumbProps) => (
    <ColorThumbAria
        className={`${styles.thumb} ${className}`}
        {...props}
    />
);