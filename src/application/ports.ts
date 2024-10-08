export interface IFactsService<TFactResult> {
    getFact(): Promise<TFactResult>;
}

export interface ILocalStorageService<LocalStorageType> {
    get(): Promise<LocalStorageType | null>;
    post(item: LocalStorageType): void;
}
