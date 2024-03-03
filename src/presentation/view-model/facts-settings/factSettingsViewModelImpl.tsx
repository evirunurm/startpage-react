import FactHolder from "../../../domain/entity/facts/models/FactHolder";
import FactListener from "../../../domain/entity/facts/models/FactListener";
import { FactType } from "../../../domain/entity/facts/structures/FactTypeEnum";
import FactsUseCase from "../../../domain/interactors/facts/factsUseCase";
import BaseView from "../../view/BaseView";
import FactSettingsViewModel from "./factSettingsViewModel";

export default class FactSettingsViewModelImpl implements FactSettingsViewModel, FactListener {
	public factType: FactType;
	public fact: string;

	public factsUseCase: FactsUseCase;
	public factHolder: FactHolder;
	private baseViews: BaseView[];

	public constructor(factsUseCase: FactsUseCase, factHolder: FactHolder) {
		this.factType = FactType.None;
		this.factsUseCase = factsUseCase;
		this.factHolder = factHolder;
		this.fact = '';
		this.baseViews = [];

		this.factHolder.addFactListener(this);
	}

	onNextFactClicked = async (): Promise<void> => {
		console.log('FactSettingsViewModelImpl.onNextFactClicked', this.factType);
		if (this.factHolder.isOff()) {
			return;
		}
		this.fetchFactResult(this.factType);
	}

	onFactTypeClicked = async (factType: FactType): Promise<void> => {
		this.factType = factType;
		this.notifyViewAboutChanges();
		console.log('FactSettingsViewModelImpl.onFactTypeClicked', factType);
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
	
	private notifyViewAboutChanges = (): void => {
		console.log(this.baseViews)
		this.baseViews.forEach((view : BaseView) => {
			view.onViewModelChanged();
		});
	};

	private fetchFactResult = async (factType: FactType): Promise<void> => {
		try {
			await this.factsUseCase.fetchFactResult(factType);
		} catch (e) {
			console.log(e)
		}
	};

	attachView(baseView: BaseView): void {
		const index = this.baseViews.findIndex((view: BaseView) => {
			return (view.constructor.name) == (baseView.constructor.name);
		});
		if (index === -1) {
			this.baseViews.push(baseView);	
		}
	}

	attachViews(baseViews: BaseView[]): void {
		this.baseViews.push(...baseViews);
	}

	detachView(baseView: BaseView): void {
		const index = this.baseViews.findIndex((view: BaseView) => {
			return (view.constructor.name) == (baseView.constructor.name);
		});
		if (index !== -1) {
			this.baseViews.splice(index, 1);
		}
	}

	detachViews(): void {
		this.baseViews = [];
	}
}