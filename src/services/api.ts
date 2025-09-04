import { checkResponse } from '../utils/checkResponse';

const BASE_URL = 'https://norma.nomoreparties.space/api';

export const request = <T = any>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> => {
	return fetch(`${BASE_URL}${endpoint}`, options).then((res) =>
		checkResponse<T>(res)
	);
};
