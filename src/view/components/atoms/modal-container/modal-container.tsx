import React, { useEffect, useRef } from 'react';
import styles from './modal-container.module.css';
import { IconGripHorizontal } from '@tabler/icons-react';
import classNames from 'classnames';
import useDraggable from '@hooks/useDraggable';

interface ModalContainerProps {
	initialPosition?: 'center' | 'top-right';
	onClose?: () => void;
	className?: string;
}

const ModalContent: React.FC<React.PropsWithChildren<ModalContainerProps>> = ({
	children,
	initialPosition,
	onClose,
	className = ''
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	const getInitialPosition = () => {
		switch (initialPosition) {
			case 'top-right':
				return { x: window.innerWidth - 35, y: 35 };
			case 'center':
			default:
				return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		}
	};

	const { position, handleMouseDown } = useDraggable(getInitialPosition());

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape' && onClose) {
			onClose();
		}
	};

	useEffect(() => {
		if (modalRef.current) {
			modalRef.current.focus();
		}
	}, []);

	return (
		<section
			ref={modalRef}
			className={classNames(
				styles['modal-container'],
				{ [styles['modal-container--centered']]: initialPosition === 'center' },
				className
			)}
			style={{ left: position.x, top: position.y }}
			role="dialog"
			aria-labelledby="Modal"
			aria-label="Modal"
			aria-modal="true"
			tabIndex={-1}
			onKeyDown={handleKeyDown}
		>
			<div
				className={styles['drag-handle']}
				onMouseDown={handleMouseDown}
				aria-label="Drag handle"
				aria-labelledby="Drag handle"
				role="button"
				tabIndex={0}
			>
				<IconGripHorizontal size={24} />
			</div>
			{children}
		</section>
	);
};

export const ModalContainer: React.FC<React.PropsWithChildren<ModalContainerProps>> = (props) => {
	return <ModalContent {...props} />;
};