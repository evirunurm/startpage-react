import styles from "./horizontal-line.module.css";

export const HorizontalLine: React.FC = () => {
    return (
        <hr className={styles["horizontal-line"]} />
    );
};