import { LocalStorageType } from "@domain/localStorage/LocalStorageTypeEnum";
import ICatsFactResult from "../domain/fact/ICatsFactResult";

export async function catFactsAPI(): Promise<ICatsFactResult> {
    const apiUrl = process.env.REACT_APP_FACTS_CATS_URL || '';
    const response = await fetch(apiUrl, {
        mode: 'cors',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data as ICatsFactResult;
}

export async function getLocalStorage(key: LocalStorageType): Promise<string | null>{
    const item = window.localStorage.getItem(key);
    return item;
}

export async function postLocalStorage(key: LocalStorageType, value: string): Promise<void> {
    window.localStorage.setItem(key, value);
}