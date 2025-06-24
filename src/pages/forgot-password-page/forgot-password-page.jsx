import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password-page.module.css'

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(
				'https://norma.nomoreparties.space/api/password-reset',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email }),
				}
			);
			const data = await res.json();
			if (data.success) {
				sessionStorage.setItem('resetAllowed', 'true'); // защита прямого входа
				navigate('/reset-password');
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={`${styles.container} pt-20`}>
			<h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className='mb-6'>
					<Input
						type='email'
						placeholder='Укажите e-mail'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<Button htmlType='submit' type='primary' size='medium'>
					Восстановить
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

export default ForgotPasswordPage;
