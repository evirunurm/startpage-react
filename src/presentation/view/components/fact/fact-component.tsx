import React from "react";
import { Button } from "../button/button";
import FactSettingsViewModel from "../../../view-model/facts-settings/factSettingsViewModel";
import BaseView from "../../BaseView";

export interface FactComponentProps {
	factViewModel: FactSettingsViewModel;
}

export interface FactComponentState {
	fact: string;
}

export default class FactComponent extends React.Component<FactComponentProps, FactComponentState>
  implements BaseView {
  private factViewModel: FactSettingsViewModel;

  public constructor(props: FactComponentProps) {
	super(props);

	const { factViewModel } = this.props;
	this.factViewModel = factViewModel;

	this.state = {
		fact: factViewModel.fact,
	};
  }

  public componentDidMount(): void {
	this.factViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
	this.factViewModel.detachView(this);
  }

  // We update state of our component
  // on each update of ViewModel
  public onViewModelChanged(): void {
	this.setState(
	{
		fact: this.factViewModel.fact,
	});
  }

  public render(): JSX.Element {
	const {
		fact
	} = this.state;

	return (
	<>
		<p>FACT: {fact}</p>
		<Button label="Next" onClick={this.factViewModel.onNextFactClicked}></Button>
	</>
	);
  }
}