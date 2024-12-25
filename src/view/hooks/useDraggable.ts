import { useState, useEffect, useCallback } from 'react';

const useDraggable = (initialPosition: { x: number, y: number }) => {
	const [position, setPosition] = useState(initialPosition);
	const [isDragging, setIsDragging] = useState(false);
	const [offset, setOffset] = useState({ x: 0, y: 0 });

	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		setIsDragging(true);
		setOffset({
			x: e.clientX - position.x,
			y: e.clientY - position.y
		});
		console.log('handleMouseDown');
	}, [position]);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (isDragging) {
			setPosition({
				x: e.clientX - offset.x,
				y: e.clientY - offset.y
			});
		}
	}, [isDragging, offset]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, [handleMouseMove, handleMouseUp]);

	return { position, handleMouseDown };
};

export default useDraggable;