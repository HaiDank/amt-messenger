import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Chatbox from '../components/chatbox/Chatbox';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { fetchChatBoxes } from '../api';

const Messenger: React.FC = () => {
	const uid = useAppSelector((state) => state.user.uid);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const unsubscibe = fetchChatBoxes(dispatch, uid!);

		return () => {
			if (unsubscibe) {
				unsubscibe();
			}
		};
	}, []);

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
