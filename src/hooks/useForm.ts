import { useState, type ChangeEvent } from 'react';

export function useForm<T extends Record<string, string>>(inputValues: T) {
	const [values, setValues] = useState<T>(inputValues);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	return { values, handleChange, setValues };
}
