import React, { useState, useEffect, useRef } from 'react';
import styles from './modal-container.module.css';
import { IconGripHorizontal } from '@tabler/icons-react';

interface ModalContainerProps {
	initialPosition?: 'center' | 'top-right';
	onClose?: () => void;
}

export const ModalContainer = ({
	children,
	initialPosition = 'center',
	onClose
}: React.PropsWithChildren<ModalContainerProps>) => {
	const getInitialPosition = () => {
		switch (initialPosition) {
			case 'top-right':
				return { x: window.innerWidth - 75, y: 50 };
			case 'center':
			default:
				return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
		}
	};

	const [position, setPosition] = useState(getInitialPosition());
	const [isDragging, setIsDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });
	const modalRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);
		setOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (isDragging) {
			setPosition({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y
			});
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape' && onClose) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [isDragging, offset]);

	useEffect(() => {
		if (modalRef.current) {
			modalRef.current.focus();
		}
	}, []);

	return (
		<section
			ref={modalRef}
			className={styles['modal-container']}
			style={{ left: position.x, top: position.y }}
			role="dialog"
			aria-label="Modal"
			aria-modal="true"
			tabIndex={-1}
			onKeyDown={handleKeyDown}
		>
			<div
				className={styles['drag-handle']}
				onMouseDown={handleMouseDown}
				aria-label="Drag handle"
				role="button"
				tabIndex={0}
			>
				<IconGripHorizontal size={24} />
			</div>
			{children}
		</section>
	);
};