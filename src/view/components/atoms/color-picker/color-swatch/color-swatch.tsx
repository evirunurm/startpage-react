import { ColorSwatchProps, ColorSwatch as ColorSwatchAria } from 'react-aria-components';
import styles from './color-swatch.module.css';

export function ColorSwatch(props: ColorSwatchProps) {
    return (
        <ColorSwatchAria
            {...props}
            className={styles.swatch}
            style={({ color }) => ({
                background: `linear-gradient(${color}, ${color}),
                    repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`
            })}
        />
    );
}