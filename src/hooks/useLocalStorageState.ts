import React from "react";

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
