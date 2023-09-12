import React from 'react';
import SidebarOption from './SidebarOption';

const Sidebar: React.FC = () => {
	return (
		<>
			<div className='relative flex h-full bg-fancy max-w-1/3'>
				<SidebarOption />
			</div>
		</>
	);
};

export default Sidebar;
