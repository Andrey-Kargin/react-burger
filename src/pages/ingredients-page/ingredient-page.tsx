import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchIngredients } from '../../services/ingredientsSlice';
import styles from './ingredient-page.module.css';
import { TIngredient } from '../../utils/types';

const IngredientPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch();

	const {
		items: ingredients,
		loading,
		error,
	} = useSelector((state: any) => state.ingredients) as {
		items: TIngredient[];
		loading: boolean;
		error: string | null;
	};

	const [ingredient, setIngredient] = useState<TIngredient | null>(null);

	useEffect(() => {
		if (!ingredients.length) {
			(dispatch as any)(fetchIngredients());
		}
	}, [dispatch, ingredients.length]);

	useEffect(() => {
		if (ingredients.length && id) {
			const found = ingredients.find((item) => item._id === id) || null;
			setIngredient(found);
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
