import { CurrentDate } from "@components/atoms/currentDate/CurrentDate";
import { CurrentTime } from "@components/atoms/currentTime/CurrentTime";
import styles from "./date-time.module.css";

export const DateTime: React.FC = () => {
	return (
		<div className={styles["date-time"]}>
			<CurrentDate/>
			<CurrentTime/>
		</div>
	);
};
