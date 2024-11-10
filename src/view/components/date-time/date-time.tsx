import { CurrentDate } from "@components/atoms/current-date/current-date";
import { CurrentTime } from "@components/atoms/current-time/current-time";
import styles from "./date-time.module.css";

export const DateTime: React.FC = () => {
	return (
		<div className={styles["date-time"]}>
			<CurrentDate/>
			<CurrentTime/>
		</div>
	);
};
