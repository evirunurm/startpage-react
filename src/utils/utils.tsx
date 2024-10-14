import IBookmarkLibrary from "@domain/bookmarks/BookmarkLibrary";
import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import React from "react";

export function getEnumKeys<
	T extends string,
	TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
	const keysAndValues: string[] = Object.keys(enumVariable);
	const keys: number[] = keysAndValues
		.filter((key: number | string) => !isNaN(Number(key)))
		.map((key: string | number) => Number(key));
	return keys;
}

export function useLibraryState() {
	const setLibraryState = (newValue: IBookmarkLibrary) => {
		window.localStorage.setItem(
			LocalStorageType.BookmarkLibrary,
			JSON.stringify(newValue)
		);
		window.dispatchEvent(
			new StorageEvent("storage", { key: LocalStorageType.BookmarkLibrary, newValue: JSON.stringify(newValue) })
		);
	};

	const getSnapshot = () => localStorage.getItem(LocalStorageType.BookmarkLibrary);

	const subscribe = (listener: () => void) => {
		window.addEventListener("storage", listener);
		return () => void window.removeEventListener("storage", listener);
	};

	const storeSnapshot = React.useSyncExternalStore(subscribe, getSnapshot);
	const store: IBookmarkLibrary | null = storeSnapshot 
		? JSON.parse(storeSnapshot as string) as IBookmarkLibrary 
		: null;

	return [store, setLibraryState] as const;
}

export function useLocalStorageState<TResult>(key: string) {
	const setState = (newValue: TResult) => {
		window.localStorage.setItem(
			key,
			JSON.stringify(newValue)
		);
		window.dispatchEvent(
			new StorageEvent("storage", { key, newValue: JSON.stringify(newValue) })
		);
	};

	const getSnapshot = () => localStorage.getItem(key);

	const subscribe = (listener: () => void) => {
		window.addEventListener("storage", listener);
		return () => void window.removeEventListener("storage", listener);
	};

	const storeSnapshot = React.useSyncExternalStore(subscribe, getSnapshot);
	const store: TResult | null = storeSnapshot 
		? JSON.parse(storeSnapshot as string) as TResult 
		: null;

	return [store, setState] as const;
}

