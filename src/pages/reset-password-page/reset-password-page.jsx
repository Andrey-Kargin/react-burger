import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './reset-password-page.module.css';
import { request } from '../../services/api';
import { useForm } from '../../hooks/useForm';

const ResetPasswordPage = () => {
	const { values, handleChange } = useForm({ password: '', token: '' });
	const navigate = useNavigate();

	useEffect(() => {
		if (!sessionStorage.getItem('resetAllowed')) {
			navigate('/forgot-password', { replace: true });
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await request('/password-reset', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					password: values.password,
					token: values.token,
				}),
			});
			const data = await res.json();
			if (data.success) {
				sessionStorage.removeItem('resetAllowed');
				navigate('/login');
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={`${styles.container} pt-20`}>
			<h1 className='text text_type_main-medium mb-6'>Сброс пароля</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className='mb-6'>
					<Input
						type='password'
						placeholder='Новый пароль'
						name='password'
						value={values.password}
						onChange={handleChange}
					/>
				</div>
				<div className='mb-6'>
					<Input
						type='text'
						placeholder='Код из письма'
						name='token'
						value={values.token}
						onChange={handleChange}
					/>
				</div>
				<Button htmlType='submit' type='primary' size='medium'>
					Сохранить
				</Button>
			</form>
			<p className='text text_type_main-default text_color_inactive mt-20'>
				Вспомнили пароль?{' '}
				<Link to='/login' className='text text_color_accent'>
					Войти
				</Link>
			</p>
		</div>
	);
};

export default ResetPasswordPage;
