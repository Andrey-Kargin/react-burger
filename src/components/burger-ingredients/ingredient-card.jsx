import { useDrag } from 'react-dnd';
import { openIngredient } from '../../services/ingredientDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';

export const IngredientCard = ({ ingredient }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { ingredients, bun } = useSelector((state) => state.burgerConstructor);

	const count =
		ingredient.type === 'bun'
			? bun?._id === ingredient._id
				? 2
				: 0
			: ingredients.filter((i) => i._id === ingredient._id).length;

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	const handleClick = () => {
		dispatch(openIngredient(ingredient));
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		});
	};

	return (
		<li
			className={styles.ingredientCard}
			onClick={handleClick}
			ref={dragRef}
			role='button'
			tabIndex={0}
			onKeyDown={(e) => e.key === 'Enter' && handleClick()}>
			{count > 0 && <Counter count={count} size='default' />}
			<img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4' />
			<div className={`${styles.priceContainer} mt-1`}>
				<span className='text text_type_digits-default'>
					{ingredient.price}
				</span>
				<CurrencyIcon type='primary' />
			</div>
			<p className='text text_type_main-default mt-1'>{ingredient.name}</p>
		</li>
	);
};
