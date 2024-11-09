import styles from "./row-layout.module.css";

export const RowLayout = ({ children }: React.PropsWithChildren) => {
	return <section className={styles["row-layout"]}>{children}</section>;
};
