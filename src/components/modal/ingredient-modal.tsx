import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Modal from './modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { closeIngredient } from '../../services/ingredientDetailsSlice';

import { useAppDispatch, useAppSelector } from '../../services/store';
import type { TIngredient } from '../../utils/types';

const IngredientModal: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { items: ingredients, loading } = useAppSelector(
		(state) => state.ingredients
	);

	const ingredient: TIngredient | undefined = ingredients?.find(
		(item: TIngredient) => item._id === id
	);

	useEffect(() => {
		if (!ingredients?.length) {
			dispatch(fetchIngredients());
		}
	}, [dispatch, ingredients?.length]);

	const handleClose = () => {
		dispatch(closeIngredient());
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
