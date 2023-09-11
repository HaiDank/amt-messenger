import React from 'react';
import SidebarItem from './SidebarItem';
import useAppRoutes from '../../hooks/useAppRoutes';
import {BsMessenger} from 'react-icons/bs'

const SidebarOption: React.FC = () => {
	const routes = useAppRoutes();

	return (
		<div className='h-full z-40 w-[70px] flex flex-col items-center flex-shrink-0 bg-gray-700 float-left'>
            <div className='font-bold m-2 '>
                <BsMessenger/>
            </div>
           
			{routes.map((route) => (
				<SidebarItem path={route.path} icon={route.icon} active={route.active} />
			))}
		</div>
	);
};

export default SidebarOption;
