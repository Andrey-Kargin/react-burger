import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredientsSlice';
import styles from './ingredient-page.module.css';

const IngredientPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const {
		items: ingredients,
		loading,
		error,
	} = useSelector((state) => state.ingredients);
	const [ingredient, setIngredient] = useState(null);

	useEffect(() => {
		if (!ingredients.length) {
			dispatch(fetchIngredients());
		}
	}, [dispatch, ingredients.length]);

	useEffect(() => {
		if (ingredients.length && id) {
			const found = ingredients.find((item) => item._id === id);
			setIngredient(found || null);
		}
	}, [ingredients, id]);

	if (loading || !ingredients.length || !ingredient) {
		return (
			<p className='pt-20 text text_type_main-medium'>
				Загрузка ингредиентов...
			</p>
		);
	}

	if (error) {
		return (
			<p className='pt-20 text text_type_main-medium'>Ошибка загрузки данных</p>
		);
	}

	return (
		<main className='pt-20'>
			<section className={`${styles.container} text text_type_main-default`}>
				<h1 className='text text_type_main-large text-center mb-8'>
					Детали ингредиента
				</h1>
				<IngredientDetails ingredient={ingredient} />
			</section>
		</main>
	);
};

export default IngredientPage;
