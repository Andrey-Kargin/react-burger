import PropTypes from 'prop-types';

export const IngredientType = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
	price: PropTypes.number.isRequired,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string,
	__v: PropTypes.number,
});
