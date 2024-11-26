import React, { useEffect } from 'react';
import styles from './modal.module.css';
import { Dialog, Heading, Modal as ModalAria, ModalOverlay } from 'react-aria-components';

interface ModalProps {
	isDismissable?: boolean;
	isOpen: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

export const Modal = ({
	isDismissable = true,
	isOpen,
	children,
	onOpenChange,
}: React.PropsWithChildren<ModalProps>) => {
	const [isModalOpen, setModalOpen] = React.useState(isOpen);

	const handleOpenChange = (isOpen: boolean) => {
		console.log('handleOpenChange:', isOpen);
		setModalOpen(isOpen);
		onOpenChange?.(isOpen);
	}

	useEffect(() => {
		console.log('Modal is open:', isModalOpen);
		setModalOpen(isOpen);
	}, [isOpen]);

	return (
		<ModalOverlay
			className={styles['modal-overlay']}
			isOpen={isModalOpen}
			onOpenChange={handleOpenChange}
			isDismissable={isDismissable}
		>
			<ModalAria
				isOpen={isModalOpen}
				onOpenChange={handleOpenChange}
				isDismissable={isDismissable}
			>
				<Dialog
					aria-label="Editing bookmarks for folder"
					aria-describedby="Editing bookmarks for folder">
					{children}
				</Dialog>
			</ModalAria>
		</ModalOverlay >
	);
};