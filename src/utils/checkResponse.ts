export async function checkResponse<T>(res: Response): Promise<T> {
	if (!res.ok) {
		let message = 'Ошибка сервера';
		try {
			const data = await res.json();
			if (data?.message) message = data.message;
		} catch {}
		throw new Error(message);
	}
	return res.json() as Promise<T>;
}
