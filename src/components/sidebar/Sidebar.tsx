import React from 'react';
import SidebarOption from './SidebarOption';

const Sidebar: React.FC = () => {
	return (
		<>
			<div className='relative flex h-full bg-fancy'>
				<SidebarOption />
			</div>
		</>
	);
};

export default Sidebar;
