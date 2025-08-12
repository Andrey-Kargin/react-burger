export async function checkResponse<T>(res: Response): Promise<T> {
	if (res.ok) {
		return res.json() as Promise<T>;
	}

	const err = await res.json().catch(() => ({}));
	return Promise.reject(new Error(err.message || 'Ошибка сервера'));
}
