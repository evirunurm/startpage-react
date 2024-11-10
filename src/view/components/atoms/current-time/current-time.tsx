import { transformDateTo12H, transformDateTo24H } from "@utils/utils";
import { useEffect, useState } from "react";
import styles from "./current-time.module.css";

export const CurrentTime: React.FC = () => {

	const getCurrentTime = (hour24: boolean = true) => {
		if (hour24) {
			return transformDateTo24H(new Date());
		}

		return transformDateTo12H(new Date());
	};

	const [time, setTime] = useState<string>(getCurrentTime(false));

	useEffect(() => {
		setInterval(() => {
			const currentTime: string = getCurrentTime(false);
			setTime(currentTime);
		}, 1000);
	}, []);

	return (
		<h2 className={styles["current-time"]}>{time}</h2>
	);
};
