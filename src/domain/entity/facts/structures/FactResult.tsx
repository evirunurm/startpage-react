import { FactType } from "./FactTypeEnum";
// Abstract data structure for transferring facts API result between layers
export default interface FactResult {
    factType: FactType;
}