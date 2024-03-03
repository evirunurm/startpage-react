import BaseView from '../view/BaseView';

export default interface BaseViewModel {
  attachView(baseView: BaseView): void;
  attachViews(baseView: BaseView[]): void;
  detachView(settingsView: BaseView): void;
  detachViews(): void;
}