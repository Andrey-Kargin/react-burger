import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

export const DraggableItem = ({ item, index, moveCard, handleRemove }) => {
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: 'sortable-ingredient',
		hover(draggedItem) {
			if (!ref.current || draggedItem.index === index) return;
			moveCard(draggedItem.index, index);
			draggedItem.index = index;
		},
	});

	const [{ isDragging }, drag] = useDrag({
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
			style={{ opacity: isDragging ? 0.5 : 1 }}
		>
			<DragIcon type="primary" />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image_mobile}
				handleClose={() => handleRemove(item.uid)}
			/>
		</li>
	);
};
