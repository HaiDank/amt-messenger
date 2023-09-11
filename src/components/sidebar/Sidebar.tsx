import React from 'react';
import SidebarOption from './SidebarOption';
import ChatOption from './ChatOption';

const Sidebar: React.FC = () => {
	return (
		<>
			<div className='fixed flex h-full max-w-1/3  bg-blue-400'>
				<SidebarOption />
				<ChatOption />
			</div>
		</>
	);
};

export default Sidebar;
