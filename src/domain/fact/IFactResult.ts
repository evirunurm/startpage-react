import { FactType } from "@domain/fact/FactTypeEnum";

// Abstract data structure for transferring facts API result between layers
export default interface IFactResult {
    factType: FactType;
}