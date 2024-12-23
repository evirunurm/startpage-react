import { PropsWithChildren } from 'react';
import styles from './disclosure.module.css';
import { DisclosurePanel, Heading, Disclosure as DiscloreAria, DisclosureProps as DisclosurePropsAria } from 'react-aria-components';
import { Button } from '../button/button';
import { IconTriangleFilled } from '@tabler/icons-react/';
import { Switch } from '../switch/switch';
import classNames from 'classnames';

type DisclosureProps = DisclosurePropsAria & {
	title: string;
	wide?: boolean;
	selected?: boolean;
	onSelectedSwitch?: (isSelected: boolean) => void;
}

export const Disclosure = ({ title, wide, children, selected, onSelectedSwitch, ...props }: PropsWithChildren<DisclosureProps>) => {

	return (
		<DiscloreAria
			className={styles.disclosure}
			{...props}
		>
			<Heading className={styles['heading']}>
				<Button
					className={classNames({ [styles['button--disabled']]: selected === false })}
					padding='0'
					slot="trigger"
					isDisabled={selected === false}
				>
					<IconTriangleFilled
						className={styles.icon}
						size={12}
					/>
					{title}
				</Button>
				{
					selected !== undefined &&
					<Switch
						isSelected={selected}
						onChange={onSelectedSwitch}
					/>
				}
			</Heading>
			<DisclosurePanel
				className={classNames(styles['panel'], {
					[styles['panel--wide']]: wide
				})}
			>
				{children}
			</DisclosurePanel>
		</DiscloreAria>
	);
}