import IBaseView from '../view/IBaseView';

export default interface IBaseViewModel {
  notifyViewAboutChanges(baseView: IBaseView): void;
  attachView(baseView: IBaseView): void;
  attachViews(baseView: IBaseView[]): void;
  detachView(settingsView: IBaseView): void;
  detachViews(): void;
}