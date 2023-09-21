import { Avatar } from 'antd';
import React from 'react';
import ChatMessage from './ChatMessage';
import { MessageType } from '../../state/chat/ChatboxSlice';
import { useAppSelector } from '../../hooks/useAppRedux';

type ChatboxContentPropsType = {
	messages: MessageType[];
};

const ChatboxContent: React.FC = () => {

	
	const chatbox = useAppSelector(state => state.chatbox)

	
		

	

	return (
		<div >
			
		</div>
	);
};

export default ChatboxContent;
