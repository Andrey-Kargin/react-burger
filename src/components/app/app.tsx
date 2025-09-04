import styles from './app.module.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';

import Modal from '../modal/modal';
import IngredientModal from '../modal/ingredient-modal';
import OrderDetails from '../order-details/order-details';

import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import IngredientPage from '../../pages/ingredients-page/ingredient-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import HomePage from '../../pages/home-page/home-page';

import FeedPage from '../../pages/feed-page/feed-page';
import ProfileOrdersPage from '../../pages/profile-orders-page/profile-orders-page';
import OrderPage from '../../pages/order-page/order-page';
import OrderInfoModal from '../modal/order-info-modal';

import { fetchIngredients } from '../../services/ingredientsSlice';
import { closeIngredient } from '../../services/ingredientDetailsSlice';
import { clearOrder } from '../../services/orderSlice';

import ProtectedRoute from '../protected-route/protected-route';
import { checkAuth } from '../../services/authSlice';
import type { TLocationState } from '../../utils/types';

export const App = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const location = useLocation();

	const background = (location.state as TLocationState | undefined)?.background;

	const { item: selectedIngredient } = useSelector(
		(state: any) => state.ingredientDetails
	);
	const { error, loading } = useSelector((state: any) => state.ingredients);
	const { isModalOpen } = useSelector((state: any) => state.order);

	useEffect(() => {
		dispatch(fetchIngredients() as any);
		dispatch(checkAuth() as any);
	}, [dispatch]);

	const closeModal = () => {
		if (selectedIngredient) {
			dispatch(closeIngredient() as any);
			if (background) {
				navigate(-1);
			} else {
				navigate('/');
			}
			return;
		}

		dispatch(clearOrder() as any);
	};

	if (loading) {
		return (
			<p className='text text_type_main-medium p-10'>
				Загрузка ингредиентов...
			</p>
		);
	}

	if (error) {
		return (
			<p className='text text_type_main-medium p-10'>
				Ошибка загрузки ингредиентов
			</p>
		);
	}

	return (
		<div className={styles.app}>
			<AppHeader />

			<Routes location={background || location}>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/login'
					element={
						<ProtectedRoute anonymous={true}>
							<LoginPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRoute anonymous={true}>
							<RegisterPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<ProtectedRoute anonymous={true}>
							<ForgotPasswordPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRoute anonymous={true}>
							<ResetPasswordPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile/orders'
					element={
						<ProtectedRoute>
							<ProfileOrdersPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile/orders/:number'
					element={
						<ProtectedRoute>
							<OrderPage />
						</ProtectedRoute>
					}
				/>

				<Route path='/ingredients/:id' element={<IngredientPage />} />
				<Route path='/feed' element={<FeedPage />} />
				<Route path='/feed/:number' element={<OrderPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>

			{background && (
				<Routes>
					<Route path='/ingredients/:id' element={<IngredientModal />} />
					<Route path='/feed/:number' element={<OrderInfoModal />} />
					<Route
						path='/profile/orders/:number'
						element={
							<ProtectedRoute>
								<OrderInfoModal />
							</ProtectedRoute>
						}
					/>
				</Routes>
			)}

			{isModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
