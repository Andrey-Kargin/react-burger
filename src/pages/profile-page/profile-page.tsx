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

type TUser = {
	name: string;
	email: string;
};

const profileLinks: Array<{ route: string; text: string }> = [
	{ route: '/profile', text: 'Профиль' },
	{ route: '/profile/orders', text: 'История заказов' },
];

const ProfilePage: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const nameRef = useRef<HTMLInputElement | null>(null);

	const [values, setValues] = useState<{
		name: string;
		email: string;
		password: string;
	}>({
		name: '',
		email: '',
		password: '',
	});
	const [isChanged, setIsChanged] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(true);

	const { user, isAuthenticated } = useSelector((state: any) => state.auth) as {
		user: TUser | null;
		isAuthenticated: boolean;
	};

	usePageTitle('Профиль');

	useEffect(() => {
		if (user) {
			setValues({ name: user.name, email: user.email, password: '' });
		}
	}, [user]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prev) => ({ ...prev, [name]: value }));
		setIsChanged(true);
	};

	const onIconClick = useCallback(() => {
		setDisabled(false);
	}, []);

	const onBlurName = () => {
		setDisabled(true);
	};

	const resetForm = () => {
		if (user) {
			setValues({ name: user.name, email: user.email, password: '' });
			setIsChanged(false);
		}
	};

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			(dispatch as any)(updateUser(values));
			setIsChanged(false);
		},
		[dispatch, values]
	);

	const signOut = async () => {
		await (dispatch as any)(logoutUser());
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
					<button
						type='button'
						className={`${styles.link} text text_type_main-medium text_color_inactive`}
						onClick={signOut}>
						Выход
					</button>
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
						name='name'
						ref={nameRef}
						onIconClick={onIconClick}
						onChange={handleChange}
						onBlur={onBlurName}
						disabled={disabled}
						extraClass='mb-6'
					/>
					<EmailInput
						onChange={handleChange}
						value={values.email}
						name='email'
						placeholder='Email'
						isIcon={true}
						extraClass='mb-6'
					/>
					<PasswordInput
						placeholder='Пароль'
						icon='EditIcon'
						size='default'
						onChange={handleChange}
						value={values.password}
						name='password'
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
