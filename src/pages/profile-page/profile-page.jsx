import styles from './profile-page.module.css';
import {
	Input,
	EmailInput,
	PasswordInput,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUser } from '../../services/authSlice';
import { useEffect, useRef, useCallback, useState } from 'react';
import { usePageTitle } from '../../utils/hooks';

const profileLinks = [
	{ route: '/profile', text: 'Профиль' },
	{ route: '/profile/orders', text: 'История заказов' },
];

const ProfilePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const nameRef = useRef(null);

	const [values, setValues] = useState({ name: '', email: '', password: '' });
	const [isChanged, setIsChanged] = useState(false);
	const [disabled, setDisabled] = useState(true);

	const { user, isAuthenticated } = useSelector((state) => state.auth);

	usePageTitle('Профиль');

	useEffect(() => {
		if (user) {
			setValues({ name: user.name, email: user.email, password: '' });
		}
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
		setIsChanged(true);
	};

	const onIconClick = useCallback((e) => {
		e.preventDefault();
		setDisabled(false);
	}, []);

	const onBlurName = () => {
		setDisabled(true);
	};

	const resetForm = (e) => {
		e.preventDefault();
		if (user) {
			setValues({ name: user.name, email: user.email, password: '' });
			setIsChanged(false);
		}
	};

	const onSubmit = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(updateUser(values));
			setIsChanged(false);
		},
		[dispatch, values]
	);

	const signOut = async () => {
		await dispatch(logoutUser());
		navigate('/login');
	};

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	return (
		<main className={styles.main}>
			<section className={styles.side_panel}>
				<nav className={styles.navigation_panel}>
					{profileLinks.map((link) => (
						<NavLink
							key={link.route}
							to={link.route}
							end
							className={({ isActive }) =>
								`${styles.link} text text_type_main-medium ` +
								(isActive ? 'text_color_primary' : 'text_color_inactive')
							}>
							{link.text}
						</NavLink>
					))}
					<a
						className={`${styles.link} text text_type_main-medium text_color_inactive`}
						onClick={signOut}>
						Выход
					</a>
				</nav>
				<p className='text text_type_main-default text_color_inactive'>
					В этом разделе вы можете изменить&nbsp;свои персональные данные
				</p>
			</section>
			<section className={styles.outlet}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Input
						icon='EditIcon'
						placeholder='Имя'
						value={values.name}
						name={'name'}
						ref={nameRef}
						onIconClick={onIconClick}
						onChange={handleChange}
						onBlur={onBlurName}
						disabled={disabled}
						extraClass='mb-6'
					/>
					<EmailInput
						type='email'
						onChange={handleChange}
						value={values.email}
						name={'email'}
						placeholder='Email'
						isIcon={true}
						extraClass='mb-6'
					/>
					<PasswordInput
						placeholder={'Пароль'}
						icon='EditIcon'
						size={'default'}
						onChange={handleChange}
						value={values.password}
						name={'password'}
						extraClass='mb-6'
						autoComplete='false'
					/>
					{isChanged && (
						<div className={styles.group_button}>
							<Button
								type='secondary'
								size='medium'
								htmlType='reset'
								onClick={resetForm}>
								Отмена
							</Button>
							<Button type='primary' size='medium' htmlType='submit'>
								Сохранить
							</Button>
						</div>
					)}
				</form>
			</section>
			<section className={styles.side_panel} />
		</main>
	);
};

export default ProfilePage;
