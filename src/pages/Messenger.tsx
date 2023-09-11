import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import {Outlet} from 'react-router-dom';

const Messenger: React.FC = () => {
	return (
		<>
			<Sidebar />
            <Outlet />
		</>
	);
};

export default Messenger;
