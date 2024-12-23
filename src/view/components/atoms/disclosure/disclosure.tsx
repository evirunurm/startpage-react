import { PropsWithChildren } from 'react';
import styles from './disclosure.module.css';
import { DisclosurePanel, Heading, Disclosure as DiscloreAria, DisclosureProps as DisclosurePropsAria } from 'react-aria-components';
import { Button } from '../button/button';
import { IconChevronRight } from '@tabler/icons-react/';
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
			<Heading className={classNames(styles['heading'], {
				[styles['heading--disabled']]: selected === false
			})}>
				<Button
					className={classNames({ [styles['button--disabled']]: selected === false })}
					slot="trigger"
					isDisabled={selected === false}
				>
					<IconChevronRight
						className={styles.icon}
						size={24}
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