import React from 'react';
import Resizable from '../../components/Resizable';
import SidebarHeader from '../../components/sidebar/SidebarHeader';
import ChatboxNavigationItem from '../../components/chatbox/ChatboxNavigationItem';

const Archive: React.FC = () => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

	return (
		<div className='flex h-full bg-red-400 '>
			<Resizable maxWidth={550} minWidth={270}>
				<SidebarHeader title='Archived' searchFunction={onChange} />
				<div className='overflow-y-auto'>
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
				</div>
			</Resizable>
		</div>
	);
};

export default Archive;
