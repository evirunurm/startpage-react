import FactHolder from "../../../domain/entity/facts/models/FactHolder";
import FactListener from "../../../domain/entity/facts/models/FactListener";
import { FactType } from "../../../domain/entity/facts/structures/FactTypeEnum";
import FactsUseCase from "../../../domain/interactors/facts/factsUseCase";
import BaseView from "../../view/BaseView";
import FactViewModel from "./factViewModel";

export default class FactViewModelImpl implements FactViewModel, FactListener {
    public factType: FactType;
    public factsUseCase: FactsUseCase;
    public factHolder: FactHolder;
    private baseView?: BaseView;

    public constructor(factsUseCase: FactsUseCase, factHolder: FactHolder) {
        this.factType = FactType.None; // No fact type assiged at the beginning
        this.factsUseCase = factsUseCase;
        this.factHolder = factHolder;

        // We set current class as a listener of fact events 
        this.factHolder.addFactListener(this);
    }

	onFactTypeChanged = async (factType: FactType): Promise<void> => {
        this.factType = factType;
        if (factType === FactType.None) {
			this.notifyViewAboutChanges();
			return;
        }
        try {
          await this.factsUseCase.fetchFactResult(this.factType);
          // No errors
        } catch (e) {
          // In case of error
		}
        this.notifyViewAboutChanges();
    };
    
    onFactChanged(): void {
        // We change data of the model to make the view display changes on fact change
        if (this.factHolder.isOff()) {
            // Change view variables to disable the facts
        } else {
           // Change view variables to enable the fact and its type
        }
        
        this.notifyViewAboutChanges();
    }

    private notifyViewAboutChanges = (): void => {
        if (this.baseView) {
            this.baseView.onViewModelChanged();
        }
    };

    attachView(baseView: BaseView): void {
        this.baseView = baseView;
    }

    detachView(): void {
        this.baseView = undefined;
    }

}