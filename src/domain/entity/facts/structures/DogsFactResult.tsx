import FactResult from "./FactResult";
// Data structure for transferring dogs facts API result between layers
export default interface DogsFactResult extends FactResult {
    facts: string[];
    success: boolean;
}