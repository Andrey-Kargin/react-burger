import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
	const { item } = useSelector((state) => state.ingredientDetails);

	if (!item) return null;

	return (
		<div className={styles.wrapper}>
			<img
				src={item.image_large}
				alt={item.name}
				className='mb-4'
			/>
			<h3 className='text text_type_main-medium mb-8'>{item.name}</h3>
			<ul className={styles.nutrition}>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Калории, ккал
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{item.calories}
					</p>
				</li>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Белки, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{item.proteins}
					</p>
				</li>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Жиры, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{item.fat}
					</p>
				</li>
				<li className={styles.nutritionItem}>
					<p className='text text_type_main-default text_color_inactive'>
						Углеводы, г
					</p>
					<p className='text text_type_digits-default text_color_inactive'>
						{item.carbohydrates}
					</p>
				</li>
			</ul>
		</div>
	);
};

export default IngredientDetails;
