import React from 'react';
import { IngredientType } from '../../utils/types';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({ ingredient }) => {
	if (!ingredient) return null;

	return (
		<div className={styles.wrapper}>
			<img
				src={ingredient.image_large}
				alt={ingredient.name}
				className='mb-4'
			/>
			<h3 className='text text_type_main-medium mb-8'>{ingredient.name}</h3>
			<ul className={styles.nutrition}>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.calories}
					</p>
				</li>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.proteins}
					</p>
				</li>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.fat}
					</p>
				</li>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{ingredient.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};

IngredientDetails.propTypes = {
	ingredient: IngredientType.isRequired,
};

export default IngredientDetails;
