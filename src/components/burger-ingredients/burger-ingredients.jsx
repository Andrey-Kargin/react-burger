import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Tab,
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { openIngredient } from '../../services/ingredientDetailsSlice';
import { addIngredient } from '../../services/constructorSlice';
import styles from './burger-ingredients.module.css';

const IngredientCard = ({ ingredient }) => {
	const dispatch = useDispatch();
	const { ingredients, bun } = useSelector((state) => state.burgerConstructor);

	const count =
		ingredient.type === 'bun'
			? bun?._id === ingredient._id ? 2 : 0
			: ingredients.filter((i) => i._id === ingredient._id).length;

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	return (
		<li
			className={styles.ingredientCard}
			onClick={() => dispatch(openIngredient(ingredient))}
			ref={dragRef}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => e.key === 'Enter' && dispatch(openIngredient(ingredient))}
		>
			{count > 0 && <Counter count={count} size="default" />}
			<img src={ingredient.image} alt={ingredient.name} className="ml-4 mr-4" />
			<div className={`${styles.priceContainer} mt-1`}>
				<span className="text text_type_digits-default">{ingredient.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<p className="text text_type_main-default mt-1">{ingredient.name}</p>
		</li>
	);
};

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
