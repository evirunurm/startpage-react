export interface IFactsService<TFactResult> {
    getFact(): Promise<TFactResult>;
}
