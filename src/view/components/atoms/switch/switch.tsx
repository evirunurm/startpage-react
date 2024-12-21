import { Switch as SwitchAria } from "react-aria-components";
import type { SwitchProps as SwitchPropsAria } from "react-aria-components";
import styles from "./switch.module.css";

export const Switch = ({
	...props
}: SwitchPropsAria) => (

	<SwitchAria
		{...props}
		className={styles.switch}
	>
		<div className={styles.indicator} />
	</SwitchAria >
);