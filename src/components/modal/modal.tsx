import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';

type ModalProps = {
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ onClose, title, children }) => {
	const modalRoot = document.getElementById('modals');

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	if (!modalRoot) return null;

	return createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={styles.modal}>
				<div className={styles.header}>
					<h2 className='text text_type_main-large'>{title}</h2>
					<button
						className={styles.closeButton}
						onClick={onClose}
						aria-label='Закрыть'
						type='button'>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</>,
		modalRoot
	);
};

export default Modal;
