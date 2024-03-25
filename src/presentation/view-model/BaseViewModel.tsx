import IBaseView from '../view/IBaseView';
import IBaseViewModel from './IBaseViewModel';

export default class BaseViewModel implements IBaseViewModel {
	private baseViews: IBaseView[];

	public constructor() {
		this.baseViews = [];
	}

	notifyViewAboutChanges = (): void => {
		console.log('Notifying views', this.baseViews)
		this.baseViews.forEach((view : IBaseView) => {
			view.onViewModelChanged();
		});
	};

	attachView(baseView: IBaseView): void {
		this.baseViews.push(baseView);	
	}

	attachViews(baseViews: IBaseView[]): void {
		this.baseViews.push(...baseViews);
	}

	detachView(baseView: IBaseView): void {
		const index = this.baseViews.findIndex((view: IBaseView) => {
			return view == baseView;
		});
		if (index !== -1) {
			this.baseViews.splice(index, 1);
		}
	}

	detachViews(): void {
		this.baseViews = [];
	}
}