import React from 'react';
import Resizable from '../../components/Resizable';
import SidebarHeader from '../../components/sidebar/SidebarHeader';
import MenuItemHeader from '../../components/MenuItemHeader';

const Request: React.FC = () => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

	return (
		<div className='flex h-full border-gray-400 border-opacity-40 border-r-[1px]'>
			<Resizable maxWidth={550} minWidth={270}>
				<SidebarHeader title='Message Requests' searchFunction={onChange} />
				<div className='overflow-y-auto'>
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
					<MenuItemHeader />
				</div>
			</Resizable>
		</div>
	);
};

export default Request;
