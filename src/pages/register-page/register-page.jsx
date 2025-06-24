import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../services/authSlice';
import { Navigate, Link } from 'react-router-dom';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './register-page.module.css'

const RegisterPage = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, error } = useSelector((state) => state.auth);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const handleSubmit = (e) => {
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
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type='email'
						placeholder='E-mail'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type='password'
						placeholder='Пароль'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
