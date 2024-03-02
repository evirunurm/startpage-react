import BaseViewModel from "../BaseViewModel";
import { FactType } from "../../../domain/entity/facts/structures/FactTypeEnum";
// This is an interface of ViewModel that will be available
// for View. Here we define all public fields that View will
// be using
export default interface FactViewModel extends BaseViewModel {
    factType: FactType;

    onFactTypeChanged(factType: FactType): void;
}