import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import React from "react";

export function getEnumArray<
	T extends string,
	TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
	const result = Object.keys(enumVariable)
		.filter(key => isNaN(Number(key)))
		.map(key => ({
			key,
			value: enumVariable[key as T]
		}));
	return result;
}

export function generateUniqueId() {
	return Math.random().toString(36).slice(2, 16);
}

export function useLocalStorageState<TResult>(key: string) {
	const setState = (newValue: TResult) => {
		window.localStorage.setItem(key, JSON.stringify(newValue));
		window.dispatchEvent(
			new StorageEvent("storage", {
				key,
				newValue: JSON.stringify(newValue),
			})
		);
	};

	const getSnapshot = () => localStorage.getItem(key);

	const subscribe = (listener: () => void) => {
		window.addEventListener("storage", listener);
		return () => void window.removeEventListener("storage", listener);
	};

	const storeSnapshot = React.useSyncExternalStore(subscribe, getSnapshot);
	const store: TResult | null = storeSnapshot
		? (JSON.parse(storeSnapshot as string) as TResult)
		: null;

	return [store, setState] as const;
}

export function transformDateTo12H(date: Date, showSeconds: boolean = true) {
	const hour: number = date.getHours();
	const minute: string = date.getMinutes().toString().padStart(2, '0');
	const second: string = date.getSeconds().toString().padStart(2, '0');

	let ampm = "";
	if (hour >= 12) {
		ampm = "PM";
	} else {
		ampm = "AM";
	}

	if (hour > 12) {
		return (
			hour -
			12 +
			":" +
			minute +
			":" +
			(showSeconds ? second : "") +
			" " +
			ampm
		);
	}

	return hour + ":" + minute + ":" + (showSeconds ? second : "") + " " + ampm;
}

export function transformDateTo24H(date: Date, showSeconds: boolean = true) {
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return hour + ":" + minute + ":" + (showSeconds ? second : "");
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

export function transformDateToString(date: Date) {
	const weekDay = date.toLocaleString("en-US", { weekday: "long" });
	const monthDay = date.toLocaleString("en-US", { day: "numeric" });
	const month = date.toLocaleString("en-US", { month: "short" });
	const year = date.getFullYear();

	return `${weekDay}, ${monthDay}${nth(parseInt(monthDay))} ${month} ${year}`;
}
