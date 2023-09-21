import { Avatar, Button } from 'antd';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { MessageType } from '../../state/chat/ChatboxSlice';
import { parseDatefromMs } from '../../utils/timeUtils';
import { useAppSelector } from '../../hooks/useAppRedux';
import MyTooltip from '../MyTooltip';
import { PiSmileyFill } from 'react-icons/pi';
import { BiSolidShare } from 'react-icons/bi';

type ChatMessagePropsType = {
	message: MessageType;
	isGroupChat?: boolean;
};

const ChatMessage: React.FC<ChatMessagePropsType> = ({
	message,
	isGroupChat,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const customTheme = useAppSelector((state) => state.customTheme);
	const theme = useAppSelector((state) => state.theme);
	const isUser = message.uid === 1;
	let chatBubbleStyle = '';

	if (isUser) {
		switch (message.chatBorderOrder) {
			case 1: {
				chatBubbleStyle = 'rounded-ee-md';
				break;
			}
			case 2: {
				chatBubbleStyle = 'rounded-e-md';
				break;
			}
			case 3: {
				chatBubbleStyle = 'rounded-se-md';
				break;
			}
			default: {
				break;
			}
		}
	} else {
		switch (message.chatBorderOrder) {
			case 1: {
				chatBubbleStyle = 'rounded-es-md';
				break;
			}
			case 2: {
				chatBubbleStyle = 'rounded-s-md';
				break;
			}
			case 3: {
				chatBubbleStyle = 'rounded-ss-md';
				break;
			}
			default: {
				break;
			}
		}
	}

	const handleOnClick = () => {
		console.log('top', ref.current?.getBoundingClientRect().top);
		console.log('height', ref.current?.getBoundingClientRect().bottom);
	};

	return (
		<>
			{message.isDevided && (
				<div
					className={`flex items-center justify-center py-1 text-xs text-opacity-75 ${theme.textFade}`}
				>
					{message.isTimeStamped ? (
						<span className='py-[6px] select-none'>
							{parseDatefromMs(message.timeCreated).toUpperCase()}
						</span>
					) : (
						''
					)}
				</div>
			)}
			{!isUser && isGroupChat && (
				<span className={`text-xs px-4 ${theme.textFade} chat-user`}>
					User's Name
				</span>
			)}
			<div
				ref={ref}
				className={clsx('w-full flex bg-transparent items-end')}
			>
				{!isUser && isGroupChat && (
					<Avatar className='flex-shrink-0 ' />
				)}
				<div
					className={clsx(
						'flex w-full h-full gap-2 message-container',
						isUser && 'flex-row-reverse'
					)}
				>
					{/* chat bubble and title */}
					
						<MyTooltip title={parseDatefromMs(message.timeCreated)}>
							<p
								className={clsx(
									`px-3 py-[6px] rounded-3xl max-w-2/3 ${chatBubbleStyle}`,
									isUser
										? `${customTheme.bgMessage} text-white`
										: `bg-neutral-200 bg-opacity-50 ${theme.textNormal}`
								)}
							>
								{message.text}
							</p>
						</MyTooltip>
					
					{/* message actions */}

					<div className='flex flex-col items-center justify-center flex-shrink-0 invisible h-full message-actions'>
						<ul className='flex gap-1'>
							<Button
								className='flex items-center justify-center'
								type='text'
								shape='circle'
								icon={
									<span className='text-xl text-neutral-500'>
										<PiSmileyFill />
									</span>
								}
							></Button>
							<Button
								className='flex items-center justify-center'
								type='text'
								shape='circle'
								icon={
									<span className='flex text-xl text-neutral-500'>
										<BiSolidShare />
									</span>
								}
							></Button>
						</ul>
					</div>

					{/* spacer */}
					<div className='flex-1 min-w-[25%]'></div>
				</div>

				{/* status */}
				<div className='px-1'>
					<Avatar size={12} />
				</div>
			</div>
		</>
	);
};

export default ChatMessage;
