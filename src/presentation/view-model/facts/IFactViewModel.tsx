import { FactType } from "../../../domain/entity/facts/FactTypeEnum";
import IBaseViewModel from "../IBaseViewModel";
// This is an interface of ViewModel that will be available
// for View. Here we define all public fields that View will
// be using
export default interface IFactViewModel extends IBaseViewModel {
    factType: FactType;
    fact: string;

    onFactTypeClicked(factType: FactType): void;
    onFactTypeChanged(): void;
    onNextFactClicked(): void;
}