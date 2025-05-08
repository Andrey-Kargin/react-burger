import PropTypes, { shape, string, oneOf, number } from 'prop-types';

export const IngredientType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	__v: PropTypes.number,
});
