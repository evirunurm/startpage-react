import { transformDateTo12H, transformDateTo24H } from "@utils/utils";
import { useEffect, useState } from "react";

export const CurrentTime: React.FC = () => {
	// Displays the current time, in 24 Hour format and 12 Hour format (Both with and without "AM/PM").

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
		<>
			<p>{time}</p>
		</>
	);
};
