import { PropsWithChildren, useState } from 'react';
import styles from './disclosure.module.css';
import { DisclosurePanel, Heading, Disclosure as DisclosureAria, DisclosureProps as DisclosurePropsAria } from 'react-aria-components';
import { Button } from '../button/button';
import { IconChevronRight } from '@tabler/icons-react/';
import { Switch } from '../switch/switch';
import classNames from 'classnames';

type DisclosureProps = Omit<DisclosurePropsAria, 'onExpandedChange' | 'isExpanded'> & {
	title: string;
	wide?: boolean;
	selected?: boolean;
	onSelectedSwitch?: (isSelected: boolean) => void;
}

export const Disclosure = ({ title, wide, children, selected, onSelectedSwitch, defaultExpanded, ...props }: PropsWithChildren<DisclosureProps>) => {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded ?? false);

	const handleExpandedChangeEvent = (expanded: boolean) => {
		setIsExpanded(expanded);
	}

	const handleSelectedSwitch = (isSelected: boolean) => {
		setIsExpanded(isSelected);
		onSelectedSwitch?.(isSelected);
	}

	return (
		<DisclosureAria
			{...props}
			className={styles.disclosure}
			onExpandedChange={handleExpandedChangeEvent}
			isExpanded={isExpanded}
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
						onChange={handleSelectedSwitch}
					/>
				}
			</Heading>
			<DisclosurePanel
				className={classNames(styles['panel'], {
					[styles['panel--wide']]: wide
				})}
			>
				{isExpanded && children}
			</DisclosurePanel>
		</DisclosureAria>
	);
}