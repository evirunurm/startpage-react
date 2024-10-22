import { CurrentDate } from "@components/atoms/currentDate/CurrentDate";
import { CurrentTime } from "@components/atoms/currentTime/CurrentTime";

export const DateTime: React.FC = () => {
	return (
		<>
            <CurrentTime/>
			<CurrentDate/>
		</>
	);
};
