import { useState } from 'react';
import {
	Tab,
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients }) {
	const [current, setCurrent] = useState('bun');

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
									<li key={ingredient._id} className={styles.ingredientCard}>
										{ingredient.__v > 0 && (
											<Counter count={ingredient.__v} size='default' />
										)}
										<img
											src={ingredient.image}
											alt={ingredient.name}
											className='ml-4 mr-4'
										/>
										<div className={`${styles.priceContainer} mt-1`}>
											<span className='text text_type_digits-default'>
												{ingredient.price}
											</span>
											<CurrencyIcon type='primary' />
										</div>
										<p className='text text_type_main-default mt-1'>
											{ingredient.name}
										</p>
									</li>
								))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
			price: PropTypes.number.isRequired,
			image: PropTypes.string.isRequired,
			__v: PropTypes.number,
		})
	).isRequired,
};

export default BurgerIngredients;
