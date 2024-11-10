import { transformDateToString } from "@utils/utils";
import { useEffect, useState } from "react";
import styles from "./current-date.module.css";

export const CurrentDate: React.FC = () => {
	const getCurrentDate = () => {
		return transformDateToString(new Date());
	};

	const [date, setDate] = useState<string>(getCurrentDate());

	useEffect(() => {
		setInterval(() => {
			const currentTime: string = getCurrentDate();
			setDate(currentTime);
		}, 1000);
	}, []);

	return (
		<h1 className={styles["current-date"]}>{date}</h1>
	);
};
