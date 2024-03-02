import FactResult from "./FactResult";
// Data structure for transferring jokes facts API result between layers
export default interface JokesFactResult extends FactResult {
    id: number;
    type: string;
    setup: string;
    punchline: string;
}