import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Messenger: React.FC = () => {
	return (
		<>
			<div className='flex w-full h-full max-w-full max-h-full'>
				<Sidebar />
				<div className='flex-auto'>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Messenger;
