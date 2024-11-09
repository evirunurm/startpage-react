import styles from "./column-layout.module.css";

export const ColumnLayout = ({ children }: React.PropsWithChildren) => {
	return <section className={styles["column-layout"]}>{children}</section>;
};
