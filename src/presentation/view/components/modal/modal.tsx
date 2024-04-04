import React from "react";
import IBaseView from "../../IBaseView";
import { Button } from "../button/button";
import { Dialog, Heading, Modal } from "react-aria-components";

export interface ModalComponentProps {
	title: string;
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
	private title: string;

	public constructor(props: ModalComponentProps) {
		super(props);
	
		const { title, text, options } = this.props;
		this.title = title;
		this.text = text;
		this.options = options;
	}
	onViewModelChanged(): void {}

	public render(): JSX.Element {

	return (
	<>
		<Modal>
			<Dialog role="alertdialog">
			{({close}) => (
				<>
				<Heading slot="title">{this.title}</Heading>
				<p>{this.text}</p>
				<div>
				{this.options.map((option: ModalOption, key: number) => 
					<Button
						key={key}
						label={option.text}
						onPress={() => {
							option.onClick();
							close();
						}}
					></Button>
				)}
				</div>
				</>
			)}
			</Dialog>
		</Modal>
	</>
	);
  }
}

