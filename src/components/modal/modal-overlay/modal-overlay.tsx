import React from 'react';
import styles from './modal-overlay.module.css';

type ModalOverlayProps = {
	onClose: () => void;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose }) => {
	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClose();
		}
	};

	return (
		<div
			className={styles.overlay}
			role='button'
			tabIndex={0}
			aria-label='Закрыть модальное окно'
			onClick={onClose}
			onKeyDown={handleKeyDown}
		/>
	);
};

export default ModalOverlay;
