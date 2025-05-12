import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from './ingredient-card';
import styles from './burger-ingredients.module.css';

function BurgerIngredients() {
	const [current, setCurrent] = useState('bun');
	const { items: ingredients } = useSelector((state) => state.ingredients);

	const tabs = [
		{ type: 'bun', label: 'Булки' },
		{ type: 'sauce', label: 'Соусы' },
		{ type: 'main', label: 'Начинки' },
	];

	return (
		<section className={styles.container}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
			<nav className={styles.tabs}>
				{tabs.map((tab) => (
					<Tab
						key={tab.type}
						value={tab.type}
						active={current === tab.type}
						onClick={() => setCurrent(tab.type)}>
						{tab.label}
					</Tab>
				))}
			</nav>
			<div className={`${styles.ingredientsList}`}>
				{tabs.map((tab) => (
					<div key={tab.type} className={styles.ingredientCategory}>
						<h2 className='text text_type_main-medium mt-10 mb-6'>
							{tab.label}
						</h2>
						<ul className={`${styles.ingredientGrid} pl-4 pr-4`}>
							{ingredients
								.filter((item) => item.type === tab.type)
								.map((ingredient) => (
									<IngredientCard key={ingredient._id} ingredient={ingredient} />
								))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}

export default BurgerIngredients;
