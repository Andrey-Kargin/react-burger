import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from './modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { closeIngredient } from '../../services/ingredientDetailsSlice';

type TIngredientType = 'bun' | 'sauce' | 'main';

interface TIngredient {
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

const IngredientModal: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { items: ingredients, loading } = useSelector(
		(state: any) => state.ingredients
	);

	const ingredient: TIngredient | undefined = ingredients?.find(
		(item: TIngredient) => item._id === id
	);

	useEffect(() => {
		if (!ingredients?.length) {
			dispatch(fetchIngredients() as any);
		}
	}, [dispatch, ingredients?.length]);

	const handleClose = () => {
		dispatch(closeIngredient() as any);
		navigate(-1);
	};

	if (loading || !ingredient) {
		return null;
	}

	return (
		<Modal onClose={handleClose} title='Детали ингредиента'>
			<IngredientDetails ingredient={ingredient} />
		</Modal>
	);
};

export default IngredientModal;
