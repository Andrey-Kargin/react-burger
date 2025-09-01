import { useState, useRef, RefObject } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from './ingredient-card';
import styles from './burger-ingredients.module.css';
import { useTabObserver } from '../../hooks/useTabObserver';

type TabType = 'bun' | 'sauce' | 'main';

type CategoryRefs = {
	current: Record<TabType, RefObject<HTMLDivElement>>;
};

function BurgerIngredients() {
	const [current, setCurrent] = useState<TabType>('bun');

	const { items: ingredients } = useSelector(
		(state: any) => state.ingredients
	) as {
		items: any[];
	};

	const categoryRefs = useRef<Record<TabType, RefObject<HTMLDivElement>>>({
		bun: useRef<HTMLDivElement>(null),
		sauce: useRef<HTMLDivElement>(null),
		main: useRef<HTMLDivElement>(null),
	}) as CategoryRefs;

	const { setManualScroll } = useTabObserver<HTMLDivElement>(
		categoryRefs,
		setCurrent as unknown as (key: string) => void
	);

	const tabs: Array<{ type: TabType; label: string }> = [
		{ type: 'bun', label: 'Булки' },
		{ type: 'sauce', label: 'Соусы' },
		{ type: 'main', label: 'Начинки' },
	];

	const handleTabClick = (type: TabType) => {
		setCurrent(type);
		setManualScroll();
		const element = categoryRefs.current[type].current;
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className={styles.container}>
			<h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

			<nav className={styles.tabs}>
				{tabs.map((tab) => (
					<Tab
						key={tab.type}
						value={tab.type}
						active={current === tab.type}
						onClick={() => handleTabClick(tab.type)}>
						{tab.label}
					</Tab>
				))}
			</nav>

			<div className={styles.ingredientsList}>
				{tabs.map((tab) => (
					<div key={tab.type} ref={categoryRefs.current[tab.type]}>
						<h2 className='text text_type_main-medium mt-10 mb-6'>
							{tab.label}
						</h2>
						<ul className={`${styles.ingredientGrid} pl-4 pr-4`}>
							{ingredients
								?.filter((item: any) => item.type === tab.type)
								.map((ingredient: any) => (
									<IngredientCard
										key={ingredient._id}
										ingredient={ingredient}
									/>
								))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}

export default BurgerIngredients;
