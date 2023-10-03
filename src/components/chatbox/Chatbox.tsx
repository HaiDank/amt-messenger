import React, { useCallback, useRef, useState } from 'react';
import ChatboxHeader from './ChatboxHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';

import ChatboxContent from './ChatboxContent';
import {
	MessageType,
	postMessage,
	updateChatBubbleOrderAPI,
} from '../../state/chat/messageSlice';
import { BiSolidPlusCircle } from 'react-icons/bi';
import IconButton from '../IconButton';
import { HiThumbUp } from 'react-icons/hi';
import clsx from 'clsx';
import { AiFillCloseCircle } from 'react-icons/ai';
import MyTooltip from '../MyTooltip';
import MessengerInput from './MessengerInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';

const Chatbox: React.FC = () => {
	const theme = useAppSelector((state) => state.theme);

	const customTheme = useAppSelector((state) => state.customTheme);

	const user = useAppSelector((state) => state.user);

	const chosenChatboxId = useAppSelector(
		(state) => state.messages.chosenChatboxId
	);
	const messages = useAppSelector((state) => state.messages.messages);

	const dispatch = useAppDispatch();

	const formValue = useRef('');

	const [dragActive, setDragActive] = useState(false);
	const [filesWithPreviews, setFilesWithPreviews] = useState<
		{
			file: File;
			preview: string;
		}[]
	>([]);

	const submitFiles = useCallback(async () => {
		if (filesWithPreviews.length > 0) {
			const timeSent = Date.now();

			let isDevided = null;
			let isTimeStamped = null;
			const lastMessage = messages[0];
			if (lastMessage.createdAt <= timeSent - 90000) {
				isDevided = true;

				if (lastMessage.createdAt <= timeSent - 900000) {
					isTimeStamped = true;
				}
			}
			const downloadUrls = await Promise.all(
				filesWithPreviews.map(async (file) => {
					const fileRef = ref(
						storage,
						`chat-box-files/${chosenChatboxId}/${file.file.name}` +
							v4()
					);

					const snapshot = await uploadBytes(fileRef, file.file);

					const downloadUrl = await getDownloadURL(snapshot.ref);
					return downloadUrl;
				})
			);
			const newMessage = {
				uid: user.uid,
				isUnsent: null,
				mediaUrls: downloadUrls,
				reaction: null,
				removeFromUID: null,
				isDevided: isDevided,
				isTimeStamped: isTimeStamped,
			} as Omit<MessageType, 'messageId' | 'createdAt'>;
			const args = {
				message: newMessage,
				chosenChatboxId: chosenChatboxId,
				createdAt: timeSent,
			};
			dispatch(postMessage(args));
			setFilesWithPreviews([]);
		}
	},[filesWithPreviews, messages])


	const submitTexts = useCallback(() => {
		if (formValue.current.trim().length > 0 && messages) {
			const timeSent = Date.now();

			let isDevided = null;
			let isTimeStamped = null;
			let chatBorderOrder = null;
			const lastMessage = messages[0];
			console.log('lastMessages',lastMessage)
			console.log('messages',messages)

			if (lastMessage.createdAt <= timeSent - 60000) {
				isDevided = true;

				if (lastMessage.createdAt <= timeSent - 600000) {
					isTimeStamped = true;
				}
			} else if (lastMessage.uid === user.uid) {
				chatBorderOrder = 3;

				if (lastMessage.chatBorderOrder) {
					const args = {
						order: 2,
						messageId: lastMessage.messageId,
						index: messages.length - 1,
					};
					dispatch(updateChatBubbleOrderAPI(args));
				} else {
					const args = {
						order: 1,
						messageId: lastMessage.messageId,
						index: messages.length - 1,
					};

					dispatch(updateChatBubbleOrderAPI(args));
				}
			}

			const newMessage = {
				text: formValue.current,
				uid: user.uid,
				isUnsent: null,
				reaction: null,
				removeFromUID: null,
				isDevided: isDevided,
				isTimeStamped: isTimeStamped,
				chatBorderOrder: chatBorderOrder,
			} as Omit<MessageType, 'messageId' | 'createdAt'>;
			const args = {
				message: newMessage,
				chosenChatboxId: chosenChatboxId,
				createdAt: timeSent,
			};
			dispatch(postMessage(args));
			formValue.current = '';

		}
	}, [formValue, messages]);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
			e.preventDefault();
			submitFiles();
			submitTexts();
		},
		[submitFiles, formValue]
	);

	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const files = Array.from(e.dataTransfer.files);

			files.forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					if (typeof reader.result === 'string') {
						setFilesWithPreviews((prev) => [
							...prev,
							{ file: file, preview: reader.result as string },
						]);
					}
				};
				reader.readAsDataURL(file);
			});
		} else {
			setFilesWithPreviews([]);
		}
	};

	const handleOnPaste = useCallback(
		(event: React.ClipboardEvent<HTMLTextAreaElement>) => {
			const clipboardData = event.clipboardData;
			const files = Array.from(clipboardData.files);

			files.forEach((file) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					if (typeof reader.result === 'string') {
						setFilesWithPreviews((prev) => [
							...prev,
							{ file: file, preview: reader.result as string },
						]);
					}
				};
				reader.readAsDataURL(file);
			});
		},
		[]
	);

	const removeFileWithPreview = (fileToRemove: File) => {
		setFilesWithPreviews((prev) =>
			prev.filter((fp) => fp.file !== fileToRemove)
		);
	};

	//
	return !chosenChatboxId ? (
		<p className='flex items-center justify-center w-full'>
			You haven't selected any chat
		</p>
	) : (
		<div
			onDragEnter={handleDrag}
			onDragLeave={handleDrag}
			onDragOver={handleDrag}
			onDrop={handleDrop}
			className={`flex flex-col flex-1 max-w-full relative max-h-full min-w-0 pt-8 ${theme.bgColor} ${theme.textNormal}`}
		>
			<div
				className={clsx(
					`absolute top-0 left-0 z-10 w-full h-full transition-all bg-opacity-50 font-bold text-lg flex items-center justify-center ${theme.bgColor} `,
					dragActive ? 'block' : 'hidden'
				)}
			>
				{' '}
				Drop files here{' '}
			</div>

			<ChatboxHeader />

			<ChatboxContent />

			<form
				className='flex items-end gap-3 p-3'
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className={`${customTheme.textColorPrimary} mb-[3px]`}>
					<IconButton tooltipTitle='Add Media'>
						<BiSolidPlusCircle />
					</IconButton>
				</div>

				{/* image preview here */}
				<div className='flex flex-col flex-auto px-2 py-1 bg-gray-200 bg-opacity-50 rounded-3xl'>
					<div
						className={clsx(
							'items-center justify-start gap-2 pt-1',
							filesWithPreviews.length > 0 ? 'flex ' : 'hidden'
						)}
					>
						{filesWithPreviews.map((file, index) => {
							return (
								<div key={index} className='relative'>
									<MyTooltip title={file.file.name}>
										<img
											src={file.preview}
											className='object-cover w-20 select-none rounded-xl aspect-square drag-none'
										/>
									</MyTooltip>
									<IconButton
										className='absolute top-0 right-0 text-sm'
										tooltipTitle='Remove Attachment'
										onClick={() =>
											removeFileWithPreview(file.file)
										}
									>
										<AiFillCloseCircle />
									</IconButton>
								</div>
							);
						})}
					</div>

					<MessengerInput
						onPaste={handleOnPaste}
						onUpdate={(args) => {
							formValue.current = args;
						}}
						onSubmit={handleSubmit}
					/>
					{/*  */}
				</div>

				<div className={`${customTheme.textColorPrimary} mb-[4px]`}>
					<IconButton tooltipTitle='Send a Like'>
						<HiThumbUp />
					</IconButton>
				</div>
			</form>
		</div>
	);
};

export default Chatbox;
