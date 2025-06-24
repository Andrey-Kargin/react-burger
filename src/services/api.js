const BASE_URL = 'https://norma.nomoreparties.space/api';

export const request = async (endpoint, options = {}) => {
	const res = await fetch(`${BASE_URL}${endpoint}`, options);
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data.message || 'Ошибка сервера');
	}
	return data;
};
