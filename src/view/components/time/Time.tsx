import { transformDateTo12H, transformDateTo24H } from "@utils/utils";
import { useEffect, useState } from "react";

export const Time: React.FC = () => {
    // This component:
    // 1. Displays the current time, in 24 Hour format and 12 Hour format (Both with and without "AM/PM").
    // 2. Displays current week day, month day, month and year, in the format: "Monday, 1st Jan 2021".

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
        }, 1000)
    
      }, [])
    
	return (
		<>
			<p>Time: {time}</p>
		</>
	);
};
