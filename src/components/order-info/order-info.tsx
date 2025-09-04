import React, { useMemo } from 'react';
import styles from './order-info.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredient, TOrder } from '../../utils/types';

type Props = {
	order: TOrder;
	allIngredients: TIngredient[];
};

// Функция перевода статуса с безопасным fallback
const statusText = (s: string) => {
	switch (s) {
		case 'created':
			return 'Создан';
		case 'pending':
			return 'Готовится';
		case 'done':
			return 'Выполнен';
		default:
			return 'Отменён';
	}
};

const OrderInfo: React.FC<Props> = ({ order, allIngredients }) => {
	const { rows, total } = useMemo(() => {
		const map = new Map<string, { ing: TIngredient; qty: number }>();
		order.ingredients.forEach((id) => {
			const found = allIngredients.find((i) => i._id === id);
			if (!found) return;
			const prev = map.get(id);
			if (prev) prev.qty += 1;
			else map.set(id, { ing: found, qty: 1 });
		});
		const arr = Array.from(map.values());
		const sum = arr.reduce((s, r) => s + r.ing.price * r.qty, 0);
		return { rows: arr, total: sum };
	}, [order.ingredients, allIngredients]);

	return (
		<div className={styles.wrap}>
			<p className={`${styles.center} text text_type_digits-default mb-10`}>
				#{order.number}
			</p>

			<h2 className='text text_type_main-medium mb-3'>{order.name}</h2>

			<p
				className={`text text_type_main-default mb-15 ${
					order.status === 'done' ? styles.done : ''
				}`}>
				{statusText(order.status)}
			</p>

			<h3 className='text text_type_main-medium mb-6'>Состав:</h3>

			<ul className={styles.list}>
				{rows.map(({ ing, qty }) => (
					<li key={ing._id} className={styles.row}>
						<div className={styles.cellLeft}>
							<div className={styles.icon}>
								<img src={ing.image_mobile} alt={ing.name} />
							</div>
							<p className='text text_type_main-default'>{ing.name}</p>
						</div>
						<div className={styles.cellRight}>
							<span className='text text_type_digits-default'>
								{qty} x {ing.price}
							</span>
							<CurrencyIcon type='primary' />
						</div>
					</li>
				))}
			</ul>

			<footer className={styles.footer}>
				<span className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order.createdAt)} />
				</span>

				<div className={styles.total}>
					<span className='text text_type_digits-default'>{total}</span>
					<CurrencyIcon type='primary' />
				</div>
			</footer>
		</div>
	);
};

export default OrderInfo;
