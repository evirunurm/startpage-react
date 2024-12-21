import React, { useEffect } from "react";
import { Article } from "@components/atoms/article/article";
import { Disclosure } from "@components/atoms/disclosure/disclosure";
import { RadioGroup } from "@components/atoms/radio-group/radio-group";
import { Radio } from "@components/atoms/radio/radio";
import { getEnumArray } from "@utils/utils";
import { TimeFormat } from "@domain/timeFomat/ITimeFormat";
import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { useTranslation } from "react-i18next";

export const TimeFormatSettings: React.FC = () => {
	const { t } = useTranslation();
	const [storedTimeFormat, setStoredTimeFormat] = useLocalStorageState<TimeFormat>(LocalStorageType.TimeFormat);
	const handleTimeFormatChange = (newValue: string) => {
		setStoredTimeFormat(newValue as TimeFormat);
	}

	const sortByKey = (a: { key: string }, b: { key: string }) => (a.key < b.key ? -1 : 1)

	useEffect(() => {
		if (storedTimeFormat === null) {
			setStoredTimeFormat(TimeFormat.TWELVE_HOUR_AM_PM);
		}
	}, [storedTimeFormat, setStoredTimeFormat]);

	return (
		<Disclosure title="Time Format">
			<Article>
				<RadioGroup
					value={storedTimeFormat?.toString()}
					aria-label="Time Format"
					onChange={handleTimeFormatChange}
				>
					{
						getEnumArray(TimeFormat)
							.sort(sortByKey)
							.map(({ key, value }) => (
								<Radio
									key={key}
									value={value.toString()}
								>
									{t(`time.${key}`)}
								</Radio>
							))
					}
				</RadioGroup>
			</Article>
		</Disclosure>
	);
}