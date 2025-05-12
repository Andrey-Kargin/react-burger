import {
	ConstructorElement,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useMemo } from 'react';
import { DraggableItem } from './draggable-item';

import {
	addIngredient,
	removeIngredient,
	moveIngredient,
} from '../../services/constructorSlice';
import { sendOrder } from '../../services/orderSlice';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
	const dispatch = useDispatch();
	const { bun, ingredients } = useSelector((state) => state.burgerConstructor);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop: (item) => {
			dispatch(addIngredient(item));
		},
	});

	const moveCard = (fromIndex, toIndex) => {
		dispatch(moveIngredient({ fromIndex, toIndex }));
	};

	const handleRemove = (uid) => {
		dispatch(removeIngredient(uid));
	};

	const orderTotal = useMemo(() => {
		const fillingsTotal = ingredients.reduce((sum, item) => sum + item.price, 0);
		const bunTotal = bun ? bun.price * 2 : 0;
		return fillingsTotal + bunTotal;
	}, [ingredients, bun]);

	const handleOrder = () => {
		if (!bun) return;
		const ingredientIds = [
			bun._id,
			...ingredients.map((item) => item._id),
			bun._id,
		];
		dispatch(sendOrder(ingredientIds));
	};

	return (
		<section className={`${styles.burgerConstructor} mt-25 pl-4`} ref={dropTarget}>
			{bun && (
				<ConstructorElement
					extraClass='ml-8'
					text={`${bun.name} (верх)`}
					thumbnail={bun.image_mobile}
					price={bun.price}
					type='top'
					isLocked={true}
				/>
			)}

			<ul className={styles.list}>
				{ingredients.map((item, index) => (
					<DraggableItem
						key={item.uid}
						item={item}
						index={index}
						moveCard={moveCard}
						handleRemove={handleRemove}
					/>
				))}
			</ul>

			{bun && (
				<ConstructorElement
					extraClass='ml-8'
					text={`${bun.name} (низ)`}
					thumbnail={bun.image_mobile}
					price={bun.price}
					type='bottom'
					isLocked={true}
				/>
			)}

			<div className={`${styles.total} mt-10`}>
				<span className='text text_type_digits-medium'>
					{orderTotal}
					<CurrencyIcon type='primary' className={styles.totalCurrency} />
				</span>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					extraClass='ml-10'
					onClick={handleOrder}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};


export default BurgerConstructor;
