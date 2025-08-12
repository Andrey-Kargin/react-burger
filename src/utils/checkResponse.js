export function checkResponse(res) {
	return res.ok
		? res.json()
		: res
				.json()
				.then((err) =>
					Promise.reject(new Error(err.message || 'Ошибка сервера'))
				);
}
