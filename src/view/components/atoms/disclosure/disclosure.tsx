import { PropsWithChildren } from 'react';
import styles from './disclosure.module.css';
import { DisclosurePanel, Heading, Disclosure as DiscloreAria } from 'react-aria-components';
import { Button } from '../button/button';
import { IconTriangleFilled } from '@tabler/icons-react';
import classNames from 'classnames';

type DisclosureProps = {
	title: string;
	wide?: boolean;
}

export const Disclosure = ({ title, wide, children }: PropsWithChildren<DisclosureProps>) => {

	return (
		<DiscloreAria className={styles.disclosure}>
			<Heading>
				<Button
					padding='0'
					slot="trigger"
				>
					<IconTriangleFilled
						className={styles.icon}
						size={12}
					/>
					{title}
				</Button>
			</Heading>
			<DisclosurePanel className={classNames(styles['panel'], { [styles['panel--wide']]: wide })}>
				{children}
			</DisclosurePanel>
		</DiscloreAria>
	);
}