import IFactResult from "./IFactResult";
// Data structure for transferring dogs facts API result between layers
export default interface IDogsFactResult extends IFactResult {
    facts: string[];
    success: boolean;
}