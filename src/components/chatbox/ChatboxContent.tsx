import { Avatar } from 'antd';
import React from 'react';
import ChatMessage, { MessageType } from './ChatMessage';
import { messagesData } from '../../dummyData';

type ChatboxContentPropsType = {
	messages: MessageType[];
};

const ChatboxContent: React.FC = () => {

	const messages = messagesData; 

	return (
		<div className='relative flex flex-col flex-auto gap-2 px-4 overflow-y-auto'>
			{messages.map((message, index) => (
				<ChatMessage  key={index} message={message}/>
			))}
			<span className='flex items-center justify-end w-full gap-1'>
				<Avatar className='flex-shrink-0' size={12}/>
				<Avatar className='flex-shrink-0' size={12}/>
			</span>
		</div>
	);
};

export default ChatboxContent;
