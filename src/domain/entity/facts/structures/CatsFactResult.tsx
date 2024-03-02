import FactResult from "./FactResult";
// Data structure for transferring cats facts API result between layers
export default interface CatsFactResult extends FactResult {
    fact: string;
    length: number;
}