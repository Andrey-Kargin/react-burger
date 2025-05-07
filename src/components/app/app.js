import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import data from '../../utils/data';

const bun = data.find((item) => item.type === 'bun');
const getRandomFillings = (data, count) => {
	const ingredients = data.filter(
		(item) => item.type === 'main' || item.type === 'sauce'
	);
	const shuffled = ingredients.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

const fillings = getRandomFillings(data, 6);

export const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients ingredients={data} />
				<BurgerConstructor bun={bun} fillings={fillings} />
			</main>
		</div>
	);
};
