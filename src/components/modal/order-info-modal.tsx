import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../modal/modal';
import OrderInfo from '../order-info/order-info';
import { useSelector } from 'react-redux';
import { TIngredient } from '../../utils/types';

type TOrder = {
	_id: string;
	number: number;
	name: string;
	status: 'created' | 'pending' | 'done';
	ingredients: string[];
	createdAt: string;
	updatedAt: string;
};

const OrderInfoModal: React.FC = () => {
	const navigate = useNavigate();
	const { number } = useParams<{ number: string }>();
	const n = Number(number);

	const feed = useSelector((s: any) => s.feed) as { orders: TOrder[] };
	const prof = useSelector((s: any) => s.profileOrders) as { orders: TOrder[] };
	const { items: allIngredients } = useSelector((s: any) => s.ingredients) as {
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
