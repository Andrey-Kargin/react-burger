import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../../components/order-info/order-info';
import { request } from '../../services/api';
import type { TIngredient, TOrder } from '../../utils/types';
import styles from './order-page.module.css';
import { useAppSelector } from '../../services/store';

const OrderPage: React.FC = () => {
	const { number } = useParams<{ number: string }>();
	const n = Number(number);

	const feed = useAppSelector((s) => s.feed) as { orders: TOrder[] };
	const prof = useAppSelector((s) => s.profileOrders) as { orders: TOrder[] };
	const { items: allIngredients } = useAppSelector((s) => s.ingredients) as {
		items: TIngredient[];
	};

	const wsOrder = useMemo(
		() =>
			feed?.orders?.find((o) => o.number === n) ||
			prof?.orders?.find((o) => o.number === n),
		[feed?.orders, prof?.orders, n]
	);

	const [apiOrder, setApiOrder] = useState<TOrder | null>(null);
	const order = wsOrder || apiOrder;

	useEffect(() => {
		let ignore = false;
		if (!wsOrder && n) {
			(async () => {
				try {
					const data = await request<{ orders: TOrder[] }>(`/orders/${n}`);
					if (!ignore) setApiOrder(data.orders[0] ?? null);
				} catch {
					if (!ignore) setApiOrder(null);
				}
			})();
		}
		return () => {
			ignore = true;
		};
	}, [wsOrder, n]);

	if (!order) return null;

	return (
		<main className={styles.page}>
			<section className={styles.center}>
				<OrderInfo order={order} allIngredients={allIngredients} />
			</section>
		</main>
	);
};

export default OrderPage;
