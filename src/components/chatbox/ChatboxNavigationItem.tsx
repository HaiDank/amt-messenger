import { Avatar } from 'antd';
import React from 'react';
import ChatboxTitle from './ChatboxTitle';

const ChatboxNavigationItem: React.FC = () => {
	return (
		<div className='flex items-center gap-2 p-2 pr-0'>
			<Avatar
				size={44}
				className='flex-shrink-0'
				src='./src/assets/admin-avatar.png'
			/>

			<ChatboxTitle />

			<div className=''>
				<span className=''>
					<Avatar size='small' />
				</span>
			</div>
		</div>
	);
};

export default ChatboxNavigationItem;
