import FactHolder from "../../../domain/entity/facts/models/FactHolder";
import IFactListener from "../../../domain/entity/facts/models/FactListener";
import { FactType } from "../../../domain/entity/facts/FactTypeEnum";
import FactsUseCase from "../../../domain/interactors/facts/factsUseCase";
import IFactViewModel from "./IFactViewModel";
import BaseViewModel from "../BaseViewModel";

export default class FactViewModel extends BaseViewModel implements IFactViewModel, IFactListener {
	public factType: FactType;
	public fact: string;

	public factsUseCase: FactsUseCase;
	public factHolder: FactHolder;

	public constructor(factsUseCase: FactsUseCase, factHolder: FactHolder) {
		super();
		this.factType = FactType.None;
		this.factsUseCase = factsUseCase;
		this.factHolder = factHolder;
		this.fact = '';

		this.factHolder.addFactListener(this);
	}

	onNextFactClicked = async (): Promise<void> => {
		if (this.factHolder.isOff()) {
			return;
		}
		this.fetchFactResult(this.factType);
	}

	onFactTypeClicked = async (factType: FactType): Promise<void> => {
		this.factType = factType;
		this.notifyViewAboutChanges();
		if (factType === FactType.None) {
			this.fact = '';
			this.notifyViewAboutChanges();
			return;
		}
		this.fetchFactResult(factType);
	};

	onFactTypeChanged = async () => {
		this.fact = this.factHolder.getFact();
		this.notifyViewAboutChanges();
	}
	
	private fetchFactResult = async (factType: FactType): Promise<void> => {
		try {
			await this.factsUseCase.fetchFactResult(factType);
		} catch (e) {
			console.log('Error', e)
		}
	};


}