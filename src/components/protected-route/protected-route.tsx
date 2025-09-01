import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

type ProtectedRouteProps = {
	children: React.ReactElement;
	anonymous?: boolean;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	anonymous = false,
}) => {
	const isLoggedIn = useSelector(
		(store: any) => store.auth.isAuthenticated
	) as boolean;
	const location = useLocation();
	const from = (location.state as { from?: string })?.from || '/';

	if (anonymous && isLoggedIn) {
		return <Navigate to={from} />;
	}

	if (!anonymous && !isLoggedIn) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;
