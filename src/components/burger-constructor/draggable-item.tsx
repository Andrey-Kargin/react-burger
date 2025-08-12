import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

type TIngredientType = 'bun' | 'sauce' | 'main';

interface TIngredient {
	_id: string;
	name: string;
	type: TIngredientType;
	price: number;
	image_mobile: string;
}

interface DragIngredient extends TIngredient {
	uid: string;
}

type DragItem = DragIngredient & { index: number };

type DraggableItemProps = {
	item: DragIngredient;
	index: number;
	moveCard: (fromIndex: number, toIndex: number) => void;
	handleRemove: (uid: string) => void;
};

export const DraggableItem: React.FC<DraggableItemProps> = ({
	item,
	index,
	moveCard,
	handleRemove,
}) => {
	const ref = useRef<HTMLLIElement | null>(null);

	const [, drop] = useDrop<DragItem>({
		accept: 'sortable-ingredient',
		hover(draggedItem) {
			if (!ref.current) return;
			if (draggedItem.index === index) return;

			moveCard(draggedItem.index, index);
			draggedItem.index = index;
		},
	});

	const [{ isDragging }, drag] = useDrag<
		DragItem,
		unknown,
		{ isDragging: boolean }
	>({
		type: 'sortable-ingredient',
		item: { ...item, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	drag(drop(ref));

	return (
		<li
			ref={ref}
			className={styles.draggableItem}
			style={{ opacity: isDragging ? 0.5 : 1 }}>
			<DragIcon type='primary' />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image_mobile}
				handleClose={() => handleRemove(item.uid)}
			/>
		</li>
	);
};
