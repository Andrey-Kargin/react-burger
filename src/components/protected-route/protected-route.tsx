import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';

type ProtectedRouteProps = {
	children: React.ReactElement;
	anonymous?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	anonymous = false,
}) => {
	const isLoggedIn = useAppSelector((store) => store.auth.isAuthenticated);
	const location = useLocation();

	const from =
		(location.state as { from?: { pathname?: string } } | undefined)?.from
			?.pathname || '/';

	if (anonymous && isLoggedIn) {
		return <Navigate to={from} />;
	}

	if (!anonymous && !isLoggedIn) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;
