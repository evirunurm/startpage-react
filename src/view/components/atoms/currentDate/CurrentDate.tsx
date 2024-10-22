import { transformDateToString } from "@utils/utils";
import { useEffect, useState } from "react";

export const CurrentDate: React.FC = () => {
	// Displays current week day, month day, month and year, in the format: "Monday, 1st Jan 2021".

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
		<>
			<p>{date}</p>
		</>
	);
};
