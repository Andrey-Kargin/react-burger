import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
	Button,
	Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './forgot-password-page.module.css';
import { request } from '../../services/api';
import { useForm } from '../../hooks/useForm';

type PasswordResetResponse = {
	success: boolean;
	message?: string;
};

const ForgotPasswordPage: React.FC = () => {
	const { values, handleChange } = useForm<{ email: string }>({ email: '' });
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const data = await request<PasswordResetResponse>('/password-reset', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: values.email }),
			});

			if (data.success) {
				sessionStorage.setItem('resetAllowed', 'true');
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
						name='email'
						value={values.email}
						onChange={handleChange}
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
