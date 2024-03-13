import IFactResult from "./IFactResult";
// Data structure for transferring jokes facts API result between layers
export default interface IJokesFactResult extends IFactResult {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}