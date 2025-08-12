import { checkResponse } from '../utils/checkResponse';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const request = (endpoint, options = {}) => {
	return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};
