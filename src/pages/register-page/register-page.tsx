import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { registerUser } from '../../services/authSlice';

const RegisterPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, error } = useAppSelector((state) => state.auth) as {
		isAuthenticated: boolean;
		error: string | null;
	};

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [name, setName] = useState<string>('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(registerUser({ email, password, name }));
	};

	if (isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	return (
		<div className={`${styles.container} pt-20`}>
			<h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className='mb-6'>
					<Input
						type='text'
						placeholder='Имя'
						value={name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setName(e.target.value)
						}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type='email'
						placeholder='E-mail'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
					/>
				</div>
				<Button htmlType='submit' type='primary' size='medium'>
					Зарегистрироваться
				</Button>
			</form>

			{error && (
				<p className='text text_type_main-default text_color_error mt-4'>
					{error}
				</p>
			)}

			<p className='text text_type_main-default text_color_inactive mt-20'>
				Уже зарегистрированы?{' '}
				<Link to='/login' className='text text_color_accent'>
					Войти
				</Link>
			</p>
		</div>
	);
};

export default RegisterPage;
