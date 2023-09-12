import React from 'react';
import { Input } from 'antd';
import { BiSolidPlusCircle } from 'react-icons/bi';
import { PiSmileyFill, PiStickerFill } from 'react-icons/pi';
import { HiThumbUp } from 'react-icons/hi';

const { TextArea } = Input;

const ChatboxInputField: React.FC = () => {
	return (
		<div className='flex items-center gap-3 px-3 py-2'>
			<span className='icon-button'>
				<BiSolidPlusCircle />
			</span>

			<div className='flex items-center justify-between flex-auto gap-2 px-2 py-1 bg-gray-200 bg-opacity-50 rounded-3xl'>
				<TextArea
					className='scrollbar-none'
					bordered={false}
					placeholder='Type a message...'
					autoSize={{ minRows: 1, maxRows: 9 }}
				/>
				<div className='flex gap-1'>
					<span className='icon-button'>
						<PiStickerFill />
					</span>
					<span className='icon-button'>
						<PiSmileyFill />
					</span>
				</div>
			</div>

            <span className='icon-button'>
				<HiThumbUp />
			</span>
		</div>
	);
};

export default ChatboxInputField;
