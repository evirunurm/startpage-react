import { formatTime } from "@utils/date-date-utils";
import { useEffect, useState } from "react";
import styles from "./current-time.module.css";
import { TimeFormat } from "@domain/timeFomat/ITimeFormat";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";

const DEFAULT_TIME_FORMAT = TimeFormat.TWELVE_HOUR_AM_PM;

export const CurrentTime: React.FC = () => {
	const [storedTimeFormat] = useLocalStorageState<TimeFormat>(LocalStorageType.TimeFormat);
	const getCurrentTime = (format: TimeFormat) => formatTime(new Date(), format);
	const [time, setTime] = useState<string>(getCurrentTime(DEFAULT_TIME_FORMAT));

	const updateTime = () => {
		setTime(getCurrentTime(storedTimeFormat ?? DEFAULT_TIME_FORMAT));
	}

	useEffect(() => {
		updateTime();

		const intervalId = setInterval(() => {
			updateTime();
		}, 1000);

		return () => clearInterval(intervalId);
	}, [storedTimeFormat, getCurrentTime]);

	return <h2 className={styles["current-time"]}>{time}</h2>;
};