import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, anonymous = false }) => {
	const isLoggedIn = useSelector((store) => store.auth.isAuthenticated);
	const location = useLocation();
	const from = location.state?.from || '/';

	if (anonymous && isLoggedIn) {
		return <Navigate to={from} />;
	}

	if (!anonymous && !isLoggedIn) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;
