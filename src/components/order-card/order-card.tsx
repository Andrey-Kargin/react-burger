import React, { useMemo } from 'react';
import styles from './order-card.module.css';
import {
	FormattedDate,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { TIngredient, TOrder } from '../../utils/types';

type Props = {
	order: TOrder;
	allIngredients: TIngredient[];
	showStatus?: boolean;
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

const OrderCard: React.FC<Props> = ({ order, allIngredients, showStatus }) => {
	const { preview, total } = useMemo(() => {
		const list = order.ingredients
			.map((id) => allIngredients.find((i) => i._id === id))
			.filter(Boolean) as TIngredient[];
		const totalPrice = list.reduce((sum, i) => sum + (i?.price || 0), 0);
		return { preview: list, total: totalPrice };
	}, [order.ingredients, allIngredients]);

	const visible = preview.slice(0, 6);
	const rest = preview.length - visible.length;

	return (
		<article className={styles.card}>
			<header className={styles.head}>
				<span className='text text_type_digits-default'>#{order.number}</span>
				<span className='text text_type_main-default text_color_inactive'>
					<FormattedDate date={new Date(order.createdAt)} />
				</span>
			</header>

			<h3 className='text text_type_main-medium mt-6'>{order.name}</h3>

			{showStatus && (
				<p
					className={`text text_type_main-default mt-2 ${
						order.status === 'done' ? styles.statusDone : ''
					}`}>
					{statusText(order.status)}
				</p>
			)}

			<footer className={`${styles.foot} mt-6`}>
				<ul className={styles.images}>
					{visible.map((ing, idx) => (
						<li
							key={ing._id}
							className={styles.imgWrap}
							style={{ zIndex: 10 - idx }}>
							<img src={ing.image_mobile} alt={ing.name} />
							{idx === 5 && rest > 0 && (
								<span className={styles.more}>+{rest}</span>
							)}
						</li>
					))}
				</ul>

				<div className={styles.price}>
					<span className='text text_type_digits-default'>{total}</span>
					<CurrencyIcon type='primary' />
				</div>
			</footer>
		</article>
	);
};

export default OrderCard;
