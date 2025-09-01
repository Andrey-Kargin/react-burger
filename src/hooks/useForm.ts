import React, { useState } from 'react';

export function useForm<T extends Record<string, any>>(inputValues: T) {
	const [values, setValues] = useState<T>(inputValues);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	return { values, handleChange, setValues };
}
