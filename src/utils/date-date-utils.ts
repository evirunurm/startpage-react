import { TimeFormat } from "@domain/timeFomat/ITimeFormat";

export function formatTime(date: Date, timeFormat: TimeFormat) {
	const hour: number = date.getHours();
	const minute: number = date.getMinutes();
	const second: number = date.getSeconds();

	const sufix: string = getTimeSufix(hour, timeFormat);
	const seconds: string = getSeconds(second, timeFormat);
	const minutes: string = getMinutes(minute);
	const hours: string = getHours(hour, timeFormat);

	return `${hours}:${minutes}${seconds ? ":" + seconds : ""}${sufix}`;
}

function getHours(hours: number, timeFormat: TimeFormat): string {
	if (isFormat12Hour(timeFormat) && hours > 12) {
		return (hours - 12).toString().padStart(2, "0");
	}
	return hours.toString().padStart(2, "0");
}

const isFormat12Hour = (timeFormat: TimeFormat): boolean => {
	return (
		timeFormat === TimeFormat.TWELVE_HOUR ||
		timeFormat === TimeFormat.TWELVE_HOUR_AM_PM ||
		timeFormat === TimeFormat.TWELVE_HOUR_WITH_SECONDS ||
		timeFormat === TimeFormat.TWELVE_HOUR_WITH_SECONDS_AM_PM
	);
};

const hasFormatSeconds = (timeFormat: TimeFormat): boolean => {
	return (
		timeFormat === TimeFormat.TWELVE_HOUR_WITH_SECONDS ||
		timeFormat === TimeFormat.TWELVE_HOUR_WITH_SECONDS_AM_PM ||
		timeFormat === TimeFormat.TWENTY_FOUR_HOUR_WITH_SECONDS
	);
};

const hasFormatAMPM = (timeFormat: TimeFormat): boolean => {
	return (
		timeFormat === TimeFormat.TWELVE_HOUR_AM_PM ||
		timeFormat === TimeFormat.TWELVE_HOUR_WITH_SECONDS_AM_PM
	);
};

const getMinutes = (minutes: number): string =>
	minutes.toString().padStart(2, "0");

function getSeconds(seconds: number, timeFormat: TimeFormat): string {
	if (hasFormatSeconds(timeFormat)) {
		return seconds.toString().padStart(2, "0");
	}
	return "";
}

function getTimeSufix(hour: number, timeFormat: TimeFormat): string {
	if (hasFormatAMPM(timeFormat)) {
		if (hour >= 12) {
			return "PM";
		} else {
			return "AM";
		}
	}
	return "";
}

function nth(day: number) {
	if (day > 3 && day < 21) return "th";
	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}

export function formatDate(date: Date) {
	const weekDay = date.toLocaleString("en-US", { weekday: "long" });
	const monthDay = date.toLocaleString("en-US", { day: "numeric" });
	const month = date.toLocaleString("en-US", { month: "short" });
	const year = date.getFullYear();

	return `${weekDay}, ${monthDay}${nth(parseInt(monthDay))} ${month} ${year}`;
}
