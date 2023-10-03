import './App.css';
import { Routes, Route } from 'react-router-dom';
import Messenger from './pages/Messenger';
import Chats from './pages/Chats/Chats';
import NotFound from './pages/NotFound';
import Martket from './pages/Marketplace/Market';
import Archive from './pages/Archive/Archive';
import Request from './pages/Request/Request';
import Test from './pages/Test';

import 'firebase/auth';
import 'firebase/database';

import RequireAuth from './pages/Auth/RequireAuth';
import SignIn from './pages/Auth/SignIn';
import { useAppDispatch} from './hooks/useAppRedux';
import { useEffect } from 'react';
import { updateStatus, updateUserStatus } from './state/userSlice';

function App() {

	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	window.addEventListener('focus', () => {
	// 		dispatch(updateStatus(true));
	// 		dispatch(updateUserStatus());
	// 	});
	// 	window.addEventListener('blur', () => {
	// 		dispatch(updateStatus(false));
	// 		dispatch(updateUserStatus());
	// 	});

	// 	return () => {
	// 		window.removeEventListener('focus', () => {
	// 			dispatch(updateStatus(true));
	// 			dispatch(updateUserStatus());
	// 		});
	// 		window.removeEventListener('blur', () => {
	// 			dispatch(updateStatus(false));
	// 			dispatch(updateUserStatus());
	// 		});
	// 	};
	// }, []);

	return (
		<>
			<Routes>
				<Route path='/login' element={<SignIn />} />
				<Route element={<RequireAuth />}>
					<Route path='/' element={<Messenger />}>
						<Route path='/chats' element={<Chats />} />
						<Route path='markets' element={<Martket />} />
						<Route path='archives' element={<Archive />} />
						<Route path='requests' element={<Request />} />
						<Route path='*' element={<NotFound />} />
					</Route>
					<Route path='test' element={<Test />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
