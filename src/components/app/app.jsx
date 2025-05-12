import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import { fetchIngredients } from '../../services/ingredientsSlice';
import { closeIngredient } from '../../services/ingredientDetailsSlice';
import { clearOrder } from '../../services/orderSlice';

export const App = () => {
	const dispatch = useDispatch();

	const { item: selectedIngredient } = useSelector((state) => state.ingredientDetails);
	const { number: orderNumber } = useSelector((state) => state.order);
	const { error, loading } = useSelector((state) => state.ingredients);

	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	const closeModal = () => {
		if (selectedIngredient) dispatch(closeIngredient());
		if (orderNumber) dispatch(clearOrder());
	};

	if (loading) {
		return <p className="text text_type_main-medium p-10">Загрузка ингредиентов...</p>;
	}

	if (error) {
		return <p className="text text_type_main-medium p-10">Ошибка загрузки ингредиентов</p>;
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>

			{selectedIngredient && (
				<Modal onClose={closeModal} title="Детали ингредиента">
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}

			{orderNumber && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
