import React from "react";
import { FactType } from "../../../../domain/entity/facts/structures/FactTypeEnum";
import FactViewModel from "../../../view-model/fact/factViewModel";
import BaseView from "../../BaseView";

export interface FactComponentProps {
	factViewModel: FactViewModel;
}

export interface FactComponentState {
	selectedFactType: FactType;
}

export default class FactComponent extends React.Component<FactComponentProps, FactComponentState>
  implements BaseView {
  private factViewModel: FactViewModel;

  public constructor(props: FactComponentProps) {
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
	this.factViewModel.detachView();
  }

  // We update state of our component
  // on each update of ViewModel
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
			onChange={(): void => this.factViewModel.onFactTypeChanged(key as FactType)}
			/>
			<label htmlFor={FactType[key]}>{FactType[key]}</label>
		</div>
		))}
	</>
	);
  }
}

function getEnumKeys<
T extends string,
TEnumValue extends string | number,>
(enumVariable: { [key in T]: TEnumValue })
{
	const keysAndValues: string[] = Object.keys(enumVariable);
	const keys: number[] = keysAndValues
		.filter((key: number | string) => !isNaN(Number(key)))
		.map((key: string | number) => Number(key));
	return keys;
}
