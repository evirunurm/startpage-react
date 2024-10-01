import React from "react";
import { createUseStyles } from 'react-jss';
import IBaseView from "../../IBaseView";
import { Button } from "../button/button";
import { Dialog, Heading, Modal } from "react-aria-components";
import { styles } from './styles.ts';
import { Classes } from "jss";


// Define a type for the styles object
interface Styles {
	container: React.CSSProperties;
	title: React.CSSProperties;
  }
  
  // Use createUseStyles with the defined styles type
  const useStyles = createUseStyles({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: '24px',
		fontWeight: 'bold',
	},
  });

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
	// private classes: Classes<"modal" | "dialog" | "buttonsContainer">;

	public constructor(props: ModalComponentProps) {
		super(props);
	
		const { title, text, options } = this.props;
		this.title = title;
		this.text = text;
		this.options = options;
		
	}
	onViewModelChanged(): void {}

	public render(): JSX.Element {
		const { title, text, options } = this;
		const classes = useStyles();
		return (
		<>
			<Modal className={classes.modal}>
				<Dialog role="alertdialog" className={classes.dialog}>
				{({close}) => (
					<>
						<Heading slot="title">{title}</Heading>
						<p>{text}</p>
						<div className={classes.buttonsContainer}>
							{options.map((option: ModalOption, key: number) => 
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

