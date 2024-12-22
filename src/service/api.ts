import { LocalStorageType } from "@domain/localStorage/LocalStorageType";
import ICatsFactResult from "../domain/fact/ICatsFactResult";
import IDogsFactResult from "@domain/fact/IDogsFactResult";
import IJokesResult from "@domain/fact/IJokesResult";

export async function catFactsAPI(): Promise<ICatsFactResult> {
	const apiUrl = process.env.VITE_REACT_APP_FACTS_CATS_URL || "";
	const response = await fetch(apiUrl, {
		mode: "cors",
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data as ICatsFactResult;
}

export async function dogFactsAPI(): Promise<IDogsFactResult> {
	const apiUrl = process.env.VITE_REACT_APP_FACTS_DOGS_URL || "";
	const response = await fetch(apiUrl, {
		mode: "cors",
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data as IDogsFactResult;
}

export async function jokesAPI(): Promise<IJokesResult> {
	const apiUrl = process.env.VITE_REACT_APP_FACTS_JOKES_URL || "";
	const response = await fetch(apiUrl, {
		mode: "cors",
	});
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	const data = await response.json();
	return data as IJokesResult;
}

export async function getLocalStorage(
	key: LocalStorageType
): Promise<string | null> {
	const item = window.localStorage.getItem(key);
	return item;
}

export async function postLocalStorage(
	key: LocalStorageType,
	value: string
): Promise<void> {
	window.localStorage.setItem(key, value);
}
