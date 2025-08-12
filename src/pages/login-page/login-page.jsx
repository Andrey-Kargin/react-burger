import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, resetError } from '../../services/authSlice';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login-page.module.css';

const LoginPage = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { isAuthenticated, error } = useSelector((state) => state.auth);
	const { values, handleChange } = useForm({ email: '', password: '' });

	useEffect(() => {
		dispatch(resetError());
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(loginUser(values));
	};

	const from = location.state?.from?.pathname || '/';

	if (isAuthenticated) {
		return <Navigate to={from} replace />;
	}

	return (
		<div className={`${styles.container} pt-20`}>
			<h1 className='text text_type_main-medium mb-6'>Вход</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className='mb-6'>
					<Input
						type='email'
						placeholder='E-mail'
						name='email'
						value={values.email}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type='password'
						placeholder='Пароль'
						name='password'
						value={values.password}
						onChange={handleChange}
					/>
				</div>
				<Button htmlType='submit' type='primary' size='medium'>
					Войти
				</Button>
			</form>
			{error && (
				<p className='text text_type_main-default text_color_error mt-4'>
					{error}
				</p>
			)}

			<p className='text text_type_main-default text_color_inactive mt-20'>
				Вы — новый пользователь?{' '}
				<Link to='/register' className='text text_color_accent'>
					Зарегистрироваться
				</Link>
			</p>
			<p className='text text_type_main-default text_color_inactive mt-4'>
				Забыли пароль?{' '}
				<Link to='/forgot-password' className='text text_color_accent'>
					Восстановить пароль
				</Link>
			</p>
		</div>
	);
};

export default LoginPage;
