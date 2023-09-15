import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import Chatbox from './Chatbox';

const Messenger: React.FC = () => {

	const navigate = useNavigate();

	useEffect(()=> {
		// navigate('chats')
	},[])

	return (
		<>
			<div className='flex w-full h-full max-w-full max-h-full overflow-hidden'>
				<Sidebar />
				<div className='flex flex-auto min-w-0'>
					<Outlet />
					<Chatbox />
				</div>
			</div>
		</>
	);
};

export default Messenger;
