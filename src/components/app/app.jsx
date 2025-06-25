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

import { fetchIngredients } from '../../services/ingredientsSlice';
import { closeIngredient } from '../../services/ingredientDetailsSlice';
import { clearOrder } from '../../services/orderSlice';

import ProtectedRouteElement from '../protected-route/protected-route';

export const App = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state?.background;

	const { item: selectedIngredient } = useSelector(
		(state) => state.ingredientDetails
	);
	const { number: orderNumber } = useSelector((state) => state.order);
	const { error, loading } = useSelector((state) => state.ingredients);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	const closeModal = () => {
		if (selectedIngredient) dispatch(closeIngredient());
		if (orderNumber) dispatch(clearOrder());
		navigate(-1);
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
						<ProtectedRouteElement onlyUnAuth={true}>
							<LoginPage />
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRouteElement onlyUnAuth={true}>
							<RegisterPage />
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<ProtectedRouteElement onlyUnAuth={true}>
							<ForgotPasswordPage />
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRouteElement onlyUnAuth={true}>
							<ResetPasswordPage />
						</ProtectedRouteElement>
					}
				/>
				<Route
					path='/profile/*'
					element={
						<ProtectedRouteElement>
							<ProfilePage />
						</ProtectedRouteElement>
					}
				/>
				<Route path='/ingredients/:id' element={<IngredientPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>

			{background && (
				<Routes>
					<Route path='/ingredients/:id' element={<IngredientModal />} />
				</Routes>
			)}

			{orderNumber && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
