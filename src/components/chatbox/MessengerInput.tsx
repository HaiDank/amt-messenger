import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import IconButton from '../IconButton';
import { PiSmileyFill, PiStickerFill } from 'react-icons/pi';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useAppSelector } from '../../hooks/useAppRedux';
import { Popover } from 'antd';

type Props = {
	onUpdate: (arg: string) => void;
	onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
	onSubmit: (
		e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
	) => void;
};

const MessengerInput: React.FC<Props> = ({ onUpdate, onSubmit, onPaste }) => {
	const customTheme = useAppSelector((state) => state.customTheme);

	const [formValue, setFormValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormValue(e.target.value);
	};


	const handleOnPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		if (onPaste) {
			onPaste(e);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLTextAreaElement>) => {
		if (onSubmit) {
			onSubmit(e);
			setFormValue('');
		}
	};

	const handleEmojiPick = (emojiObject: EmojiClickData) => {
		setFormValue((prev) => prev + emojiObject.emoji);
	};

	useEffect(() => {
		if (onUpdate) {
			onUpdate(formValue);
		}
	}, [formValue]);

	return (
		<>
			<div className='flex items-center justify-between flex-auto gap-2 '>
				<TextArea
					className='placeholder-gray-400 placeholder-medium scrollbar-none '
					bordered={false}
					placeholder='Type a message...'
					autoSize={{ minRows: 1, maxRows: 9 }}
					onChange={handleChange}
					onPaste={handleOnPaste}
					onPressEnter={handleSubmit}
					value={formValue}
				/>

				<div className={`flex gap-1 ${customTheme.textColorPrimary} `}>
					<IconButton tooltipTitle='Send a Sticker'>
						<PiStickerFill />
					</IconButton>

					<Popover
						arrow={false}
						content={<EmojiPicker onEmojiClick={handleEmojiPick} />}
						trigger='click'
					>
						<div>
							<IconButton tooltipTitle='Send an Emoji'>
								<PiSmileyFill />
							</IconButton>
						</div>
					</Popover>
				</div>
			</div>
		</>
	);
};

export default MessengerInput;
