import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/modal';
import OrderInfo from '../order-info/order-info';
import { useAppSelector } from '../../services/store';
import type { TIngredient, TOrder } from '../../utils/types';

const OrderInfoModal: React.FC = () => {
	const navigate = useNavigate();
	const { number } = useParams<{ number: string }>();
	const n = Number(number);

	const feed = useAppSelector((s) => s.feed) as { orders: TOrder[] };
	const prof = useAppSelector((s) => s.profileOrders) as { orders: TOrder[] };
	const { items: allIngredients } = useAppSelector((s) => s.ingredients) as {
		items: TIngredient[];
	};

	const order =
		feed?.orders?.find((o) => o.number === n) ||
		prof?.orders?.find((o) => o.number === n) ||
		null;

	if (!order) return null;

	const onClose = () => navigate(-1);

	return (
		<Modal onClose={onClose}>
			<OrderInfo order={order} allIngredients={allIngredients} />
		</Modal>
	);
};

export default OrderInfoModal;
