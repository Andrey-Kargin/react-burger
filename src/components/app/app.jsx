import styles from './app.module.css';
import { useEffect, useState } from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import data from '../../utils/data';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
	const [ingredients, setIngredients] = useState([]);
	const [hasError, setHasError] = useState(false);
	const [selectedIngredient, setSelectedIngredient] = useState(null);
	const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
	const [fillings, setFillings] = useState([]);
	const [bun, setBun] = useState(null);

	useEffect(() => {
		fetch(API_URL)
			.then((res) => {
				if (!res.ok) throw new Error('Ошибка при получении данных');
				return res.json();
			})
			.then((responseData) => {
				const items = responseData?.data?.length > 0 ? responseData.data : data;
				setIngredients(items);

				const bunItem = items.find((item) => item.type === 'bun');
				setBun(bunItem);

				const randomFillings = items
					.filter((item) => item.type !== 'bun')
					.sort(() => 0.5 - Math.random())
					.slice(0, 6);
				setFillings(randomFillings);
			})
			.catch(() => {
				setHasError(true);
				setIngredients(data);

				const bunItem = data.find((item) => item.type === 'bun');
				setBun(bunItem);

				const randomFillings = data
					.filter((item) => item.type !== 'bun')
					.sort(() => 0.5 - Math.random())
					.slice(0, 6);
				setFillings(randomFillings);
			});
	}, []);

	const closeModal = () => {
		setSelectedIngredient(null);
		setIsOrderModalOpen(false);
	};

	if (hasError) {
		return <p className="text text_type_main-medium p-10">Ошибка загрузки ингредиентов</p>;
	}

	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients
					ingredients={ingredients}
					onOpenIngredient={setSelectedIngredient}
				/>
				{bun && (
					<BurgerConstructor
						bun={bun}
						fillings={fillings}
						onPlaceOrder={() => setIsOrderModalOpen(true)}
					/>
				)}
			</main>

			{selectedIngredient && (
				<Modal onClose={closeModal} title='Детали ингредиента'>
					<IngredientDetails ingredient={selectedIngredient} />
				</Modal>
			)}

			{isOrderModalOpen && (
				<Modal onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</div>
	);
};
