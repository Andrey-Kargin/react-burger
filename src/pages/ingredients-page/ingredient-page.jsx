import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientPage = () => {
	const { id } = useParams();
	const ingredients = useSelector((state) => state.ingredients.items);
	const ingredient = ingredients.find((item) => item._id === id);

	if (!ingredient) {
		return (
			<p className='pt-20 text text_type_main-medium'>Ингредиент не найден</p>
		);
	}

	return (
		<section className='pt-20'>
			<IngredientDetails ingredient={ingredient} />
		</section>
	);
};

export default IngredientPage;
