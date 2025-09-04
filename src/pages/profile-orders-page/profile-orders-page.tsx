import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';

import layout from '../profile-page/profile-page.module.css'; // используем те же отступы/сетки
import styles from './profile-orders-page.module.css';

import { wsActions as profileWsActions } from '../../services/ws/profileOrdersSlice';
import { logoutUser } from '../../services/authSlice';
import OrderCard from '../../components/order-card/order-card';
import type { TIngredient, TOrder } from '../../utils/types';

const navLinks = [
	{ to: '/profile', text: 'Профиль' },
	{ to: '/profile/orders', text: 'История заказов' },
];

const ProfileOrdersPage: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { orders } = useSelector((s: any) => s.profileOrders) as {
		orders: TOrder[];
	};
	const { items: allIngredients } = useSelector((s: any) => s.ingredients) as {
		items: TIngredient[];
	};

	useEffect(() => {
		dispatch({ type: profileWsActions.connect.type });
		return () => {
			dispatch({ type: profileWsActions.disconnect.type });
		};
	}, [dispatch]);

	const signOut = async () => {
		await (dispatch as any)(logoutUser());
		navigate('/login');
	};

	return (
		<main className={layout.main}>
			{/* Левый сайдбар — идентично profile-page */}
			<section className={layout.side_panel}>
				<nav className={layout.navigation_panel}>
					{navLinks.map((l) => (
						<NavLink
							key={l.to}
							to={l.to}
							end
							className={({ isActive }) =>
								`${layout.link} text text_type_main-medium ` +
								(isActive ? 'text_color_primary' : 'text_color_inactive')
							}>
							{l.text}
						</NavLink>
					))}
					<button
						type='button'
						className={`${layout.link} text text_type_main-medium text_color_inactive`}
						onClick={signOut}>
						Выход
					</button>
				</nav>

				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете просмотреть свою&nbsp;историю заказов
				</p>
			</section>

			{/* Центральная колонка — история заказов */}
			<section className={layout.outlet}>
				{!orders || orders.length === 0 ? (
					<p className='text text_type_main-default text_color_inactive pt-10'>
						История заказов пуста
					</p>
				) : (
					<ul className={styles.list}>
						{orders.map((order) => (
							<li key={order._id}>
								<Link
									to={`/profile/orders/${order.number}`}
									state={{ background: location }}
									className={styles.cardLink}>
									<OrderCard
										order={order}
										allIngredients={allIngredients}
										showStatus
									/>
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>

			{/* Правая колонка-заглушка — как в profile-page */}
			<section className={layout.side_panel} />
		</main>
	);
};

export default ProfileOrdersPage;
