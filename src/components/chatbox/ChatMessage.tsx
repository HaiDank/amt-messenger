import { Avatar } from 'antd';
import clsx from 'clsx';
import React from 'react';

export type MessageType = {
	text: string;
	time: string;
	uid: number;
};

type ChatMessagePropsType = {
	message: MessageType;
};

const ChatMessage: React.FC<ChatMessagePropsType> = ({ message }) => {
	const isUser = message.uid === 1;

	return (
		<div className={clsx('w-full flex ', isUser && 'justify-end')}>
			<div
				className={clsx(
					'flex items-end w-2/3 gap-2',
					isUser && 'flex-row-reverse'
				)}
			>
				<Avatar className='flex-shrink-0 ' />
				<div>
					{!isUser && (
						<span className='px-4 text-xs text-neutral-400'>
							User's Name
						</span>
					)}
					<p className={clsx('px-4 py-2 rounded-3xl max-w-2/3', isUser ? 'bg-[#3955FF] text-white' : 'bg-neutral-200 bg-opacity-50 ')}>
						{message.text}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChatMessage;
