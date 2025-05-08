import {
	ConstructorElement,
	DragIcon,
	CurrencyIcon,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types';
import styles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

const BurgerConstructor = ({ bun, fillings, onPlaceOrder }) => {
	const sum =
		bun.price + fillings.reduce((result, current) => result + current.price, 0);

	return (
		<section className={`${styles.burgerConstructor} mt-25 pl-4`}>
			<ConstructorElement
				extraClass='ml-8'
				text={`${bun.name} (верх)`}
				thumbnail={bun.image_mobile}
				price={bun.price}
				type='top'
				isLocked={true}
			/>
			<ul className={styles.list}>
				{fillings.map((item) => (
					<li key={item._id}>
						<DragIcon type='primary' />
						<ConstructorElement
							text={item.name}
							thumbnail={item.image_mobile}
							price={item.price}
						/>
					</li>
				))}
			</ul>
			<ConstructorElement
				extraClass='ml-8'
				text={`${bun.name} (низ)`}
				thumbnail={bun.image_mobile}
				price={bun.price}
				type='bottom'
				isLocked={true}
			/>
			<div className={`${styles.total} mt-10`}>
				<span className='text text_type_digits-medium'>
					{sum} <CurrencyIcon type='primary' className={styles.totalCurrency} />
				</span>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					extraClass='ml-10'
					onClick={onPlaceOrder}>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	bun: IngredientType.isRequired,
	fillings: PropTypes.arrayOf(IngredientType).isRequired,
	onPlaceOrder: PropTypes.func.isRequired,
};

export default BurgerConstructor;
