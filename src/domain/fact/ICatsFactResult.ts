import IFactResult from "@domain/fact/IFactResult";

// Data structure for transferring cats facts API result between layers
export default interface ICatsFactResult extends IFactResult {
    fact: string;
    length: number;
}