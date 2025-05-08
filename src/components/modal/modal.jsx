import React, { useEffect } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes, { func, string, node } from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById('modals');

const Modal = ({ onClose, title, children }) => {
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	return ReactDOM.createPortal(
		<>
			<ModalOverlay onClose={onClose} />
			<div className={styles.modal}>
				<div className={styles.header}>
					<h2 className='text text_type_main-large'>{title}</h2>
					<button
						className={styles.closeButton}
						onClick={onClose}
						aria-label='Закрыть'>
						<CloseIcon type='primary' />
					</button>
				</div>
				<div className={styles.content}>{children}</div>
			</div>
		</>,
		modalRoot
	);
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Modal;
