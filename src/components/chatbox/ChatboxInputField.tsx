import React, { useState } from 'react';
import { Input } from 'antd';
import { BiSolidPlusCircle } from 'react-icons/bi';
import { PiSmileyFill, PiStickerFill } from 'react-icons/pi';
import { HiThumbUp } from 'react-icons/hi';
import IconButton from '../IconButton';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { addMessage } from '../../state/chat/ChatboxSlice';

const { TextArea } = Input;

const ChatboxInputField: React.FC = () => {
	const chatbox = useAppSelector((state) => state.chatbox);
	const dispatch = useAppDispatch();

	const [formValue, setFormValue] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLTextAreaElement>) => {
		e.preventDefault();

		dispatch(
			addMessage({
				text: formValue,
				timeCreated: Date.now(),
				uid: 1,
				messageId: chatbox.messages.length + 1,
			})
		);

		setFormValue('');
	};


	return (
		<div className='flex items-center gap-3 p-3 icon-blue'>
			<IconButton tooltipTitle='Add Media'>
				<BiSolidPlusCircle />
			</IconButton>

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

				<div className='flex gap-1'>
					<IconButton tooltipTitle='Send a Sticker'>
						<PiStickerFill />
					</IconButton>
					<IconButton tooltipTitle='Send an Emoji'>
						<PiSmileyFill />
					</IconButton>
				</div>
			</div>
			<IconButton tooltipTitle='Send a Like'>
				<HiThumbUp />
			</IconButton>
		</div>
	);
};

export default ChatboxInputField;
