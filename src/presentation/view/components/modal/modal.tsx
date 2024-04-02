import React from "react";
import IBaseView from "../../IBaseView";
import { Button } from "../button/button";

export interface ModalComponentProps {
	text: string;
	options: ModalOption[];
}

export interface ModalOption {
	text: string;
	onClick: () => void;
}

export interface ModalComponentState {}

export default class ModalComponent extends 
	React.Component<
		ModalComponentProps, 
		ModalComponentState
	> 
	implements IBaseView 
{
	private options: ModalOption[];
	private text: string;

	public constructor(props: ModalComponentProps) {
		super(props);
	
		const { text, options } = this.props;
		this.text = text;
		this.options = options;
	}
	onViewModelChanged(): void {}

	public render(): JSX.Element {

	return (
	<>
		<section>
			<p>{this.text}</p>
			{this.options.map((option: ModalOption) => 
				<Button
					label={option.text}
					onClick={option.onClick}
				></Button>
			)}
		</section>
	</>
	);
  }
}

