// components/modal/ingredient-modal.jsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { closeIngredient } from '../../services/ingredientDetailsSlice';

const IngredientModal = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		items: ingredients,
		loading,
		error,
	} = useSelector((state) => state.ingredients);
	const ingredient = ingredients.find((item) => item._id === id);

	useEffect(() => {
		if (!ingredients.length) {
			dispatch(fetchIngredients());
		}
	}, [dispatch, ingredients.length]);

	const handleClose = () => {
		dispatch(closeIngredient());
		navigate(-1);
	};

	if (loading || !ingredient) {
		return null; // пока грузится или ингредиент не найден — ничего не рендерим
	}

	return (
		<Modal onClose={handleClose} title='Детали ингредиента'>
			<IngredientDetails ingredient={ingredient} />
		</Modal>
	);
};

export default IngredientModal;
