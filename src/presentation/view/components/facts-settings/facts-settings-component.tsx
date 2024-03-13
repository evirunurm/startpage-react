import React from "react";
import { FactType } from "../../../../domain/entity/facts/FactTypeEnum";
import FactSettingsViewModel from "../../../view-model/facts/IFactViewModel";
import IBaseView from "../../BaseView";
import { getEnumKeys } from "../../../../utils/utils";

export interface FactSettingsComponentProps {
	factViewModel: FactSettingsViewModel;
}

export interface FactSettingsComponentState {
	selectedFactType: FactType;
}

export default class FactSettingsComponent extends React.Component<FactSettingsComponentProps, FactSettingsComponentState>
  implements IBaseView {
  private factViewModel: FactSettingsViewModel;

  public constructor(props: FactSettingsComponentProps) {
	super(props);

	const { factViewModel } = this.props;
	this.factViewModel = factViewModel;

	this.state = {
		selectedFactType: factViewModel.factType,
	};
  }

  public componentDidMount(): void {
	this.factViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
	this.factViewModel.detachView(this);
  }

  public onViewModelChanged(): void {
	this.setState(
	{
		selectedFactType: this.factViewModel.factType,
	});
  }

  public render(): JSX.Element {
	const {
		selectedFactType
	} = this.state;

	return (
	<>
		{getEnumKeys(FactType).map((key : number) => (
			<div key={key}>
				<input
				type="radio"
				id={FactType[key]}
				value={key}
				name="factType" 
				checked={selectedFactType == (key as FactType)}
				onChange={(): void => this.factViewModel.onFactTypeClicked(key as FactType)}
				/>
				<label htmlFor={FactType[key]}>{FactType[key]}</label>
			</div>
		))}
	</>
	);
  }
}

