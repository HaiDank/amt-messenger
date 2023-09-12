import React from 'react';
import { Avatar, Tooltip } from 'antd';
import SidebarItem from './SidebarItem';
import useAppRoutes from '../../hooks/useAppRoutes';
import { BsMessenger } from 'react-icons/bs';

const SidebarOption: React.FC = () => {
	const routes = useAppRoutes();

	return (
		<div className='z-40 relative w-[70px] flex flex-col  items-center flex-shrink-0 bg-opacity-50 bg-gray-400 float-left'>
			<div className='flex flex-col items-center flex-auto '>
				<div className='m-2 font-bold '>
					<BsMessenger />
				</div>

				{routes.map((route, index) => (
					<SidebarItem
						key={index}
						title={route.title}
						path={route.path}
						icon={route.icon}
						active={route.active}
					/>
				))}
			</div>
			<Tooltip placement='top' arrow={false} title='Profile Menu' mouseEnterDelay={0.7} mouseLeaveDelay={0}>
				<div className='p-2 m-1'>
					<Avatar src='./src/assets/admin-avatar.png' size='large' />
				</div>
			</Tooltip>
		</div>
	);
};

export default SidebarOption;
