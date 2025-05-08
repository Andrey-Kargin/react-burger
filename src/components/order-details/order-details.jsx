import React from 'react';
import styles from './order-details.module.css';
import doneIcon from '../../images/done.svg';

const OrderDetails = () => {
	const fakeOrderNumber = '034536';

	return (
		<div className={styles.wrapper}>
			<h2 className='text text_type_digits-large mb-8'>{fakeOrderNumber}</h2>
			<p className='text text_type_main-medium'>идентификатор заказа</p>
			<img src={doneIcon} alt='Заказ готовится' className='mt-15 mb-15' />
			<p className='text text_type_main-default mb-2'>
				Ваш заказ начали готовить
			</p>
			<p className='text text_type_main-default text_color_inactive'>
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
};

export default OrderDetails;
