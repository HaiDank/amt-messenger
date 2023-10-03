import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppRedux';



const RequireAuth: React.FC = () => {

	const location = useLocation();
	const user = useAppSelector((state) => state.user)
	// const [isLoggedIn, setIsLoggedIn] = useState(false);

    // onAuthStateChanged(auth, async (user)=>{
	// 	if(user){
	// 		setIsLoggedIn(true)
	// 	}else{
	// 		setIsLoggedIn(false)
	// 	}
	// })

	return user.name ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequireAuth;
