import React, { useState, useRef, useEffect } from 'react';
import ChatboxHeader from './ChatboxHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { addMessage, updateChatBubbleOrder } from '../../state/chat/ChatboxSlice';
import { BiSolidPlusCircle } from 'react-icons/bi';
import IconButton from '../IconButton';
import { Input } from 'antd';
import { PiSmileyFill, PiStickerFill } from 'react-icons/pi';
import { HiThumbUp } from 'react-icons/hi';
import ChatMessage from './ChatMessage';

const { TextArea } = Input;

const Chatbox: React.FC = () => {
	const theme = useAppSelector((state) => state.theme);
	const customTheme = useAppSelector((state) => state.customTheme);

	const autoScrollElement = useRef<HTMLDivElement>(null);
	const chatbox = useAppSelector((state) => state.chatbox);
	const dispatch = useAppDispatch();

	const [formValue, setFormValue] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLTextAreaElement>) => {
		e.preventDefault();
		if (formValue.trim() !== '') {
			const timeSent = Date.now();
			let isDevided;
			let isTimeStamped;
			let chatBorderOrder;
			const lastMessage = chatbox.messages[chatbox.messages.length - 1];

			if (lastMessage.timeCreated <= timeSent - 60000) {

				isDevided = true;

				if (lastMessage.timeCreated <= timeSent - 1800000) {
					isTimeStamped = true;
				}
			} else  if (lastMessage.uid === 1) {

				chatBorderOrder = 3;

				if (lastMessage.chatBorderOrder){
					dispatch(updateChatBubbleOrder(2))
				} else {
					dispatch(updateChatBubbleOrder(1))
				}

			} 

			dispatch(
				addMessage({
					text: formValue,
					timeCreated: timeSent,
					uid: 1,
					messageId: chatbox.messages.length + 1,
					isDevided: isDevided,
					isTimeStamped: isTimeStamped,
					chatBorderOrder: chatBorderOrder,
				})
			);
		}
		setFormValue('');
	};

	useEffect(() => {
		if (autoScrollElement.current) {
			autoScrollElement.current.scrollTop =
				autoScrollElement.current.scrollHeight;
		}
	}, [chatbox.messages]);

	return (
		<div
			className={`flex flex-col flex-1 max-w-full max-h-full min-w-0 pt-8 ${theme.bgColor} ${theme.textNormal}`}
		>
			<ChatboxHeader />

			<main
				ref={autoScrollElement}
				className={`relative flex flex-col flex-auto gap-[3px] px-4 pt-2 overflow-y-auto scroll-smooth`}
			>
				{chatbox.messages.map((message) => (
					<ChatMessage
						key={message.messageId}
						message={message}
						isGroupChat={chatbox.isGroup}
					/>
				))}
			</main>

			<div className='flex items-center gap-3 p-3'>
				<div className={`${customTheme.textColorPrimary}`}>
					<IconButton tooltipTitle='Add Media'>
						<BiSolidPlusCircle />
					</IconButton>
				</div>

				<div className='flex items-center justify-between flex-auto gap-2 px-2 py-1 bg-gray-200 bg-opacity-50 rounded-3xl'>
					<TextArea
						className='placeholder-gray-400 placeholder-medium scrollbar-none '
						bordered={false}
						placeholder='Type a message...'
						autoSize={{ minRows: 1, maxRows: 9 }}
						onChange={(e) => setFormValue(e.target.value)}
						onPressEnter={handleSubmit}
						value={formValue}
					/>

					<div
						className={`flex gap-1 ${customTheme.textColorPrimary} `}
					>
						<IconButton tooltipTitle='Send a Sticker'>
							<PiStickerFill />
						</IconButton>
						<IconButton tooltipTitle='Send an Emoji'>
							<PiSmileyFill />
						</IconButton>
					</div>
				</div>

				<div className={`${customTheme.textColorPrimary}`}>
					<IconButton tooltipTitle='Send a Like'>
						<HiThumbUp />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default Chatbox;
