import { useDrag } from 'react-dnd';
import { openIngredient } from '../../services/ingredientDetailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';

type TIngredientType = 'bun' | 'sauce' | 'main';

export interface TIngredient {
	_id: string;
	name: string;
	type: TIngredientType;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v?: number;
	uid?: string;
}

type IngredientCardProps = {
	ingredient: TIngredient;
};

export const IngredientCard: React.FC<IngredientCardProps> = ({
	ingredient,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const { ingredients, bun } = useSelector(
		(state: any) => state.burgerConstructor
	) as {
		ingredients: TIngredient[];
		bun: TIngredient | null;
	};

	const count =
		ingredient.type === 'bun'
			? bun?._id === ingredient._id
				? 2
				: 0
			: ingredients.filter((i) => i._id === ingredient._id).length;

	const [, dragRef] = useDrag<TIngredient>(
		() => ({
			type: 'ingredient',
			item: ingredient,
		}),
		[ingredient]
	);

	const handleClick = () => {
		dispatch(openIngredient(ingredient) as any);
		navigate(`/ingredients/${ingredient._id}`, {
			state: { background: location },
		});
	};

	return (
		<li className={styles.ingredientCard} ref={dragRef as any}>
			<button
				type='button'
				onClick={handleClick}
				aria-label={`Открыть ${ingredient.name}`}
				style={{
					all: 'unset',
					display: 'block',
					width: '100%',
					height: '100%',
					cursor: 'pointer',
				}}>
				{count > 0 && <Counter count={count} size='default' />}
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
				<p className='text text_type_main-default mt-1'>{ingredient.name}</p>
			</button>
		</li>
	);
};
