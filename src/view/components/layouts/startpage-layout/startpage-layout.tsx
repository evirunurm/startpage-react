import styles from "./startpage-layout.module.css";

export const StartpageLayout = ({ children }: React.PropsWithChildren) => {
	return <main className={styles["startpage-layout"]}>{children}</main>;
};
