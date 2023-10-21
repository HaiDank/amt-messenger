import { Avatar, Button, Popover } from 'antd';
import clsx from 'clsx';
import { forwardRef, useEffect, useState } from 'react';
import { parseDatefromMs } from '../../../utils/timeUtils';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppRedux';
import MyTooltip from '../../MyTooltip';
import { PiSmileyFill } from 'react-icons/pi';
import { BiSolidShare } from 'react-icons/bi';
import { MessageType } from '../../../state/chat/messageSlice';
import AudioPlayer from './../AudioPlayer/AudioPlayer';
import VideoPlayer from './../VideoPlayer/VideoPlayer';
import { IconBase } from 'react-icons';
import { AiOutlineArrowsAlt, AiOutlinePlus } from 'react-icons/ai';
import './chat-box.css';
import {
	setChosenChatboxFileView,
	setChosenFileUrl,
	setOpenFileView,
} from '../../../state/chat/fileViewSlice';

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
		const dispatch = useAppDispatch();
		const chosenChatbox = useAppSelector(
			(state) => state.messages.chosenChatbox
		);
		// state
		const [contentType, setContentType] = useState<
			'text' | 'audio' | 'video' | 'image'
		>('text');
		const [isOpenReaction, setIsOpenReaction] = useState(false);
		const emojiList = ['❤️', '😆', '😮', '😢', '😠', '👍', '👎'];

		let chatBubbleStyle = '';

		if (isUser) {
			switch (message.chatBorderOrder) {
				case 1: {
					chatBubbleStyle = 'rounded-ee-md';
					break;
				}
				case 2: {
					chatBubbleStyle = 'rounded-se-md';
					break;
				}
				case 3: {
					chatBubbleStyle = 'rounded-e-md';
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
					chatBubbleStyle = 'rounded-ss-md';
					break;
				}
				case 3: {
					chatBubbleStyle = 'rounded-s-md';
					break;
				}
				default: {
					break;
				}
			}
		}

		const handleSetOpenFileView = (url: string) => {
			dispatch(setOpenFileView(true));
			dispatch(setChosenChatboxFileView(chosenChatbox!));
			dispatch(setChosenFileUrl(url));
		};

		const handleOpenReaction = (value: boolean) => {
			setIsOpenReaction(value);
		};

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
			<>
				<div>
					{/*  */}
					{message.isDevided && (
						<div
							className={`flex items-center justify-center py-[6px] text-xs text-opacity-75 ${theme.textFade}`}
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
								'flex w-full  gap-2 message-container',
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
									<div
										className={clsx(
											`relative rounded-3xl max-w-[70%] max-h-[312px] overflow-hidden h-auto aspect-auto media-container ${chatBubbleStyle}`,
											isUser
												? ''
												: `bg-neutral-200 bg-opacity-50 ${theme.textNormal}`
										)}
									>
										<div className='absolute top-2 right-2 media-view-btn'>
											<MyTooltip title='Open image in full screen'>
												<button
													className='p-2 bg-opacity-50 rounded-full bg-neutral-500 hover:bg-opacity-100'
													onClick={() =>
														handleSetOpenFileView(
															message.mediaUrl!
														)
													}
												>
													<IconBase className='text-lg text-white'>
														<AiOutlineArrowsAlt />
													</IconBase>
												</button>
											</MyTooltip>
										</div>
										<img
											className='w-full h-full aspect-auto max-h-[312px] max-w-full'
											src={message.mediaUrl!}
										/>
									</div>
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
											`max-h-[420px] min-w-[200px] rounded-3xl overflow-hidden relative max-w-[70%] media-container  ${chatBubbleStyle}`,
											isUser
												? `text-white`
												: `bg-neutral-200 bg-opacity-50 text-white`
										)}
									>
										<div className='absolute z-10 top-2 right-2 media-view-btn'>
											<MyTooltip title='Open video in full screen'>
												<button
													className='p-2 bg-opacity-50 rounded-full bg-neutral-500 hover:bg-opacity-100'
													onClick={() =>
														handleSetOpenFileView(
															message.mediaUrl!
														)
													}
												>
													<IconBase className='font-semibold text-white'>
														<AiOutlineArrowsAlt />
													</IconBase>
												</button>
											</MyTooltip>
										</div>

										<VideoPlayer
											videoStyle='max-h-[420px]'
											src={message.mediaUrl!}
										/>
									</div>
								</MyTooltip>
							)}

							{/* message actions */}

							<div className='flex flex-col items-center justify-center flex-shrink-0 invisible message-actions '>
								<ul
									className={clsx(
										'flex gap-1',
										isUser && 'flex-row-reverse'
									)}
								>
									<Popover
										content={
											<div className={`flex items-center justify-center gap-[6px] px-2 py-1 text-2xl rounded-3xl ${theme.popupBgColor} bg-opacity-90 backdrop-blur-[2px]`}>
												{emojiList.map(
													(emoji, index) => (
														<span key={index} className='transition-transform hover:scale-125'>
															{emoji}
														</span>
													)
												)}
												<span className='flex items-center justify-center p-[6px] rounded-full bg-neutral-300 hover:scale-125 transition-transform'>
													<IconBase className='text-sm aspect-square'>
														<AiOutlinePlus />
													</IconBase>
												</span>
											</div>
										}
										trigger='click'
										open={isOpenReaction}
										overlayInnerStyle={{backgroundColor: 'transparent'}}
										overlayClassName='rounded-3xl overflow-hidden shadow-xl bg-transparent'
										arrow={false}
										onOpenChange={handleOpenReaction}
									>
										<MyTooltip title='Open reaction'>
											<Button
												className='flex items-center justify-center bg-neutral-100'
												type='text'
												shape='circle'
												onClick={() =>
													handleOpenReaction(true)
												}
												icon={
													<span className='text-xl text-neutral-400'>
														<PiSmileyFill />
													</span>
												}
											></Button>
										</MyTooltip>
									</Popover>
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
			</>
		);
	}
);

export default ChatMessage;
