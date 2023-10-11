import { Avatar, Button } from 'antd';
import clsx from 'clsx';
import { forwardRef, useEffect, useState } from 'react';
import { parseDatefromMs } from '../../utils/timeUtils';
import { useAppSelector } from '../../hooks/useAppRedux';
import MyTooltip from '../MyTooltip';
import { PiSmileyFill } from 'react-icons/pi';
import { BiSolidShare } from 'react-icons/bi';
import { MessageType } from '../../state/chat/messageSlice';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import VideoPlayer from './VideoPlayer/VideoPlayer';

type ChatMessagePropsType = {
	message: MessageType;
	isGroupChat?: boolean;
	isSeen?: boolean;
};

const ChatMessage = forwardRef<HTMLDivElement, ChatMessagePropsType>(
	({ message, isGroupChat, isSeen }, ref) => {
		const user = useAppSelector((state) => state.user);
		const customTheme = useAppSelector((state) => state.customTheme);
		const theme = useAppSelector((state) => state.theme);
		const isUser = message.uid === user.uid;
		const [contentType, setContentType] = useState<
			'text' | 'audio' | 'video' | 'image'
		>('text');
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

		useEffect(() => {
			if (message) {
				if (message.text) {
					setContentType('text');
				} else if (message.mediaUrl && message.mediaType) {
					const type = message.mediaType.split('/')[0]; // Extract the primary type

					switch (type) {
						case 'image':
							setContentType('image');
							break;
						case 'audio':
							setContentType('audio');
							break;

						case 'video':
							setContentType('video');
							break;

						default:
							break;
					}
				}
			}
		}, []);

		return (
			<div>
				{/*  */}
				{message.isDevided && (
					<div
						className={`flex items-center justify-center py-1 text-xs text-opacity-75 ${theme.textFade}`}
					>
						{message.isTimeStamped ? (
							<span className='py-[6px] select-none'>
								{parseDatefromMs(
									message.createdAt
								).toUpperCase()}
							</span>
						) : (
							''
						)}
					</div>
				)}
				{/*  */}
				{!isUser && isGroupChat && (
					<span
						className={`text-xs px-4 ${theme.textFade} chat-user`}
					>
						User's Name
					</span>
				)}
				{/*  */}
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

						{contentType === 'text' && (
							<MyTooltip
								title={parseDatefromMs(message.createdAt)}
							>
								<p
									className={clsx(
										`px-3 py-[6px] rounded-3xl max-w-[70%] ${chatBubbleStyle} break-words`,
										isUser
											? `${customTheme.bgMessage} text-white`
											: `bg-neutral-200 bg-opacity-50 ${theme.textNormal}`
									)}
								>
									{message.text}
								</p>
							</MyTooltip>
						)}

						{/* image view */}
						{contentType === 'image' && (
							<MyTooltip
								title={parseDatefromMs(message.createdAt)}
							>
								<img
									className='px-3 py-[6px] rounded-3xl max-w-[70%] max-h-60 h-auto aspect-auto'
									src={message.mediaUrl!}
								></img>
							</MyTooltip>
						)}
						{/* audio 'view' */}

						{contentType === 'audio' && (
							<MyTooltip
								title={parseDatefromMs(message.createdAt)}
							>
								<div
									className={clsx(
										`	min-w-[6rem] w-40 rounded-3xl px-2 py-[6px] overflow-hidden relative flex items-center justify-between  max-w-[70%] ${chatBubbleStyle}`,
										isUser
											? `text-white`
											: `bg-neutral-200 bg-opacity-50 ${theme.textNormal}`
									)}
								>
									<AudioPlayer src={message.mediaUrl!} />
								</div>
							</MyTooltip>
						)}

						{/* video view */}

						{contentType === 'video' && (
							<MyTooltip
								title={parseDatefromMs(message.createdAt)}
							>
								<div
									className={clsx(
										`	min-w-[40%]  rounded-3xl  overflow-hidden relative flex items-center justify-between  max-w-[70%] ${chatBubbleStyle}`,
										isUser
											? `text-white`
											: `bg-neutral-200 bg-opacity-50 ${theme.textNormal}`
									)}
								>
									<VideoPlayer src={message.mediaUrl!} />
								</div>
							</MyTooltip>
						)}

						{/* message actions */}

						<div className='flex flex-col items-center justify-center flex-shrink-0 invisible message-actions'>
							<ul
								className={clsx(
									'flex gap-1',
									isUser && 'flex-row-reverse'
								)}
							>
								<MyTooltip title='Open reaction'>
									<Button
										className='flex items-center justify-center bg-neutral-100'
										type='text'
										shape='circle'
										icon={
											<span className='text-xl text-neutral-400'>
												<PiSmileyFill />
											</span>
										}
									></Button>
								</MyTooltip>
								<MyTooltip title='Reply'>
									<Button
										className='flex items-center justify-center bg-neutral-100'
										type='text'
										shape='circle'
										icon={
											<span className='flex text-xl text-neutral-400'>
												<BiSolidShare />
											</span>
										}
									></Button>
								</MyTooltip>
							</ul>
						</div>

						{/* spacer */}
						<div className='flex-1 min-w-[25%]'></div>
					</div>

					{/* status */}
					{isSeen && (
						<div className='px-1'>
							<Avatar size={12} />
						</div>
					)}
				</div>
			</div>
		);
	}
);

export default ChatMessage;
