import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Link, useLocation } from 'react-router-dom';
import styles from './feed-page.module.css';

import OrderCard from '../../components/order-card/order-card';
import { wsActions as feedWsActions } from '../../services/ws/feedSlice';

const FeedPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const { orders, total, totalToday } = useAppSelector((s) => s.feed);

	const { items: allIngredients } = useAppSelector((s) => s.ingredients);

	useEffect(() => {
		dispatch({ type: feedWsActions.connect.type });
		return () => {
			dispatch({ type: feedWsActions.disconnect.type });
		};
	}, [dispatch]);

	const { doneNumbers, pendingNumbers } = useMemo(() => {
		const done: number[] = [];
		const pending: number[] = [];
		orders?.forEach((o) => {
			if (o.status === 'done') done.push(o.number);
			else if (o.status === 'pending') pending.push(o.number);
		});
		return { doneNumbers: done, pendingNumbers: pending };
	}, [orders]);

	return (
		<main className={styles.wrapper}>
			{/* Левая колонка — фикс 608px и собственный скролл */}
			<section className={styles.left}>
				<h1 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h1>
				<div className={styles.leftScroll}>
					<ul className={styles.cards}>
						{orders?.map((order) => (
							<li key={order._id}>
								<Link
									className={styles.cardLink}
									to={`/feed/${order.number}`}
									state={{ background: location }}>
									<OrderCard order={order} allIngredients={allIngredients} />
								</Link>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* Правая колонка — со скроллом и верхним отступом 100px */}
			<aside className={styles.right}>
				<div className={styles.rightScroll}>
					<div className={styles.statusBoard}>
						<div className={styles.statusCol}>
							<h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
							<div className={styles.numberColumns}>
								{Array.from({
									length: Math.ceil((doneNumbers?.length || 0) / 10),
								}).map((_, i) => (
									<ul key={i} className={styles.numberCol}>
										{doneNumbers?.slice(i * 10, i * 10 + 10).map((n) => (
											<li
												key={n}
												className={`${styles.done} text text_type_digits-default`}>
												{n}
											</li>
										))}
									</ul>
								))}
							</div>
						</div>

						<div className={styles.statusCol}>
							<h3 className='text text_type_main-medium mb-6'>В работе:</h3>
							<div className={styles.numberColumns}>
								{Array.from({
									length: Math.ceil((pendingNumbers?.length || 0) / 10),
								}).map((_, i) => (
									<ul key={i} className={styles.numberCol}>
										{pendingNumbers?.slice(i * 10, i * 10 + 10).map((n) => (
											<li key={n} className='text text_type_digits-default'>
												{n}
											</li>
										))}
									</ul>
								))}
							</div>
						</div>
					</div>

					<div className={styles.totalsBlock}>
						<h3 className='text text_type_main-medium'>
							Выполнено за всё время:
						</h3>
						<p className={`${styles.glow} text text_type_digits-large`}>
							{total ?? 0}
						</p>
					</div>

					<div className={styles.totalsBlock}>
						<h3 className='text text_type_main-medium'>
							Выполнено за сегодня:
						</h3>
						<p className={`${styles.glow} text text_type_digits-large`}>
							{totalToday ?? 0}
						</p>
					</div>
				</div>
			</aside>
		</main>
	);
};

export default FeedPage;
