import React from "react";
import { Button } from "../button/button";
import FactSettingsViewModel from "../../../view-model/facts/IFactViewModel";
import IBaseView from "../../IBaseView";

export interface FactComponentProps {
	factViewModel: FactSettingsViewModel;
}

export interface FactComponentState {
	fact: string;
}

export default class FactComponent extends 
	React.Component<
		FactComponentProps, 
		FactComponentState
	> 
	implements IBaseView 
{
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
		<Button label="Next" onPress={this.factViewModel.onNextFactClicked}></Button>
	</>
	);
  }
}