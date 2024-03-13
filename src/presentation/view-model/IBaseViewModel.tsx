import IBaseView from '../view/BaseView';

export default interface IBaseViewModel {
  notifyViewAboutChanges(baseView: IBaseView): void;
  attachView(baseView: IBaseView): void;
  attachViews(baseView: IBaseView[]): void;
  detachView(settingsView: IBaseView): void;
  detachViews(): void;
}