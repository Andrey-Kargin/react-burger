import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRouteElement = ({ children, onlyUnAuth = false }) => {
	const location = useLocation();
	const { isAuthenticated } = useSelector((state) => state.auth);

	// Страница доступна только неавторизованным
	if (onlyUnAuth && isAuthenticated) {
		return <Navigate to='/' replace />;
	}

	// Страница доступна только авторизованным
	if (!onlyUnAuth && !isAuthenticated) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRouteElement;
