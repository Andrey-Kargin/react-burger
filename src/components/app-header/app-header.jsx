import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import styles from './app-header.module.css';
function AppHeader() {
	return (
		<header className={`${styles.header} p-4`}>
			<nav className={styles.headerNav}>
				<NavLink
					to='/'
					className={`${styles.button} ${styles.buttonActive} pt-4 pr-5 pb-4 pl-5 mr-2`}>
					<BurgerIcon type='primary' />
					<p className='text text_type_main-default'>Конструктор</p>
				</NavLink>
				<NavLink to='/' className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
					<ListIcon type='secondary' />
					<p className='text text_type_main-default text_color_inactive'>
						Лента заказов
					</p>
				</NavLink>
				<Link to='/' className={styles.logo}>
					<Logo />
				</Link>
				<NavLink to='/' className={`${styles.button} pt-4 pr-5 pb-4 pl-5`}>
					<ProfileIcon type='secondary' />
					<p className='text text_type_main-default text_color_inactive'>
						Личный кабинет
					</p>
				</NavLink>
			</nav>
		</header>
	);
}

export default AppHeader;
