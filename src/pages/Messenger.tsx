import React, { useEffect } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Chatbox from '../components/chatbox/Chatbox';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { fetchChatBoxes } from '../api';
import FileViewer from '../components/chatbox/FileView/FileViewer';
import { setScreenSize } from '../state/chat/viewPortSlice';

const Messenger: React.FC = () => {
	const uid = useAppSelector((state) => state.user.uid);
	const dispatch = useAppDispatch();
	const openFileView = useAppSelector((state) => state.fileView.openFileView);
	

	useEffect(() => {
		const unsubscribe = fetchChatBoxes(dispatch, uid!);

		window.addEventListener('beforeunload', () => {
			if (unsubscribe) {
				unsubscribe();
			}
		});

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, []);

	useEffect(() => {
		const handleResize = () => {
			dispatch(
				setScreenSize({
					width: window.innerWidth,
					height: window.innerHeight,
				})
			);
		};

		window.addEventListener('resize', handleResize);

		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [dispatch]);



	return (
		<>
			<div className='flex w-full h-full max-w-full max-h-full overflow-hidden'>
				<Sidebar />
{openFileView &&
				<FileViewer
					open={openFileView}
				/>
}
				<div className='flex flex-auto min-w-0'>
					<Outlet />
					<Chatbox />
				</div>
			</div>
		</>
	);
};

export default Messenger;
