import React, { useCallback, useRef, useState } from 'react';
import ChatboxHeader from './ChatboxSections/ChatboxHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import 'react-toastify/dist/ReactToastify.css';
import ChatboxContent from './ChatboxSections/ChatboxContent';
import {
	MessageType,
	postMessage,
	updateChatBubbleOrderAPI,
} from '../../state/chat/messageSlice';
import { BiSolidPlusCircle, BiSolidSend } from 'react-icons/bi';
import IconButton from '../IconButton';
import clsx from 'clsx';
import MessengerInput from './MessengerInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase';
import { v4 } from 'uuid';
import { HiThumbUp } from 'react-icons/hi';
import { Button, Popover } from 'antd';
import { BsMicFill, BsPaperclip } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import { MAX_FILE_SIZE } from '../../config/image';
import FilePreview from './FileView/FilePreview';

const Chatbox: React.FC = () => {
	// redux
	const theme = useAppSelector((state) => state.theme);

	const customTheme = useAppSelector((state) => state.customTheme);

	const user = useAppSelector((state) => state.user);

	const chosenChatboxId = useAppSelector(
		(state) => state.messages.chosenChatbox?.chatboxId!
	);
	const messages = useAppSelector((state) => state.messages.messages);

	const dispatch = useAppDispatch();

	// ref

	const fileInputRef = useRef<HTMLInputElement>(null);

	// state
	const [formValue, setFormValue] = useState('');
	const [openAddMedia, setOpenAddMedia] = useState(false);
	const [dragActive, setDragActive] = useState(false);
	const [filesWithPreviews, setFilesWithPreviews] = useState<
		{
			file: File;
			preview: string;
		}[]
	>([]);

	// func

	const submitOneFile = async (file: { file: File; preview: string }) => {
		if (file) {
			const timeSent = Date.now();
			let isDevided = null;
			let isTimeStamped = null;
			let chatBorderOrder = null;
			const lastMessage = messages[0];
			if (lastMessage.createdAt <= timeSent - 90000) {
				isDevided = true;

				if (lastMessage.createdAt <= timeSent - 900000) {
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
			const fileRef = ref(
				storage,
				`chat-box-files/${chosenChatboxId}/${file.file.name}` + v4()
			);

			const snapshot = await uploadBytes(fileRef, file.file);

			const downloadUrl = await getDownloadURL(snapshot.ref);
			const newMessage = {
				uid: user.uid,
				isUnsent: null,
				mediaType: file.file.type,
				mediaUrl: downloadUrl,
				reaction: null,
				removeFromUID: null,
				isDevided: isDevided,
				chatBorderOrder: chatBorderOrder,
				isTimeStamped: isTimeStamped,
			} as Omit<MessageType, 'messageId' | 'createdAt'>;
			const args = {
				message: newMessage,
				chosenChatboxId: chosenChatboxId,
				createdAt: timeSent,
			};
			dispatch(postMessage(args));
		}
	};

	const submitFiles = useCallback(async () => {
		if (filesWithPreviews.length > 0) {
			filesWithPreviews.forEach((file) => {
				submitOneFile(file);
			});
		}
		setFilesWithPreviews([]);
	}, [filesWithPreviews]);

	const submitTexts = useCallback(() => {
		if (formValue.trim().length > 0 && messages) {
			const timeSent = Date.now();

			let isDevided = null;
			let isTimeStamped = null;
			let chatBorderOrder = null;
			const lastMessage = messages[0];

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
				text: formValue,
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
			setFormValue('');
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

	const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			if (filesWithPreviews.length + e.dataTransfer.files.length <= 5) {
				const files = Array.from(e.dataTransfer.files);

				files.forEach((file) => {
					if (file.size > MAX_FILE_SIZE) {
						toast.error('Cannot send file larger than 5MB', {
							position: 'top-center',
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: 'light',
						});
					} else {
						const reader = new FileReader();
						reader.onloadend = () => {
							if (typeof reader.result === 'string') {
								setFilesWithPreviews((prev) => [
									...prev,
									{
										file: file,
										preview: reader.result as string,
									},
								]);
							}
						};
						reader.readAsDataURL(file);
					}
				});
			} else {
				toast.error('Cannot send more than 5 files at a time', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'light',
				});
			}
		} else {
			setFilesWithPreviews([]);
		}
	}, []);

	const handleOnPaste = useCallback(
		(event: React.ClipboardEvent<HTMLTextAreaElement>) => {
			if (event.clipboardData && event.clipboardData.files[0])
				if (
					filesWithPreviews.length +
						event.clipboardData.files.length <=
					5
				) {
					const clipboardData = event.clipboardData;
					const files = Array.from(clipboardData.files);

					files.forEach((file) => {
						const reader = new FileReader();
						reader.onloadend = () => {
							if (typeof reader.result === 'string') {
								setFilesWithPreviews((prev) => [
									...prev,
									{
										file: file,
										preview: reader.result as string,
									},
								]);
							}
						};
						reader.readAsDataURL(file);
					});
				} else {
					toast('Cannot send more than 5 files', {
						position: 'top-center',
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: 'light',
					});
				}
		},
		[filesWithPreviews]
	);

	const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			const files = Array.from(event.target.files);
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
		}
		event.target.value = '';
	};
	const removeFileWithPreview = (index: number) => {
		setFilesWithPreviews((prev) => [
			...prev.splice(0, index),
			...prev.splice(index + 1),
		]);
	};

	//
	return !chosenChatboxId ? (
		<p className='flex items-center justify-center flex-1 w-auto max-w-full'>
			You haven't selected any chat
		</p>
	) : (
		<div
			onDragEnter={handleDrag}
			onDragOver={handleDrag}
			className={`flex flex-col flex-1 max-w-full relative max-h-full min-w-0 pt-8 ${theme.bgColor} ${theme.textNormal}`}
		>
			<ToastContainer />
			<div
				onDrop={handleDrop}
				onDragLeave={handleDrag}
				className={clsx(
					`absolute top-0 left-0 z-50 w-full h-full transition-all bg-opacity-50 font-bold text-lg flex items-center justify-center ${theme.bgColor} `,
					dragActive ? 'block' : 'hidden'
				)}
			>
				{' '}
				Drop files here{' '}
			</div>

			<ChatboxHeader />

			<ChatboxContent />

			<section className='flex items-end gap-3 p-3'>
				<input
					ref={fileInputRef}
					className='hidden'
					type='file'
					onChange={handleFileInput}
				/>
				<Popover
					open={openAddMedia}
					color={theme.popupBgHex}
					content={
						<div className='p-2'>
							<Button
								type='text'
								block
								size='small'
								icon={<BsMicFill />}
								className='flex items-center justify-center'
							>
								Record a Voice Clip
							</Button>
							<Button
								type='text'
								block
								size='small'
								icon={<BsPaperclip />}
								className='flex items-center justify-center'
								onClick={() => {
									fileInputRef.current?.click();
									setOpenAddMedia(false);
								}}
							>
								Add Attachment(s)
							</Button>
						</div>
					}
					trigger='click'
					zIndex={101}
					arrow={false}
					onOpenChange={(open) => setOpenAddMedia(open)}
				>
					<div className={`${customTheme.textColorPrimary} mb-[3px]`}>
						<IconButton tooltipTitle='Add Media'>
							<BiSolidPlusCircle />
						</IconButton>
					</div>
				</Popover>

				{/* input box here */}

				<div className='flex flex-col flex-auto px-2 py-1 bg-gray-200 bg-opacity-50 rounded-3xl'>
					{/* image preview here */}

					<div
						className={clsx(
							'items-center justify-start gap-2 pt-1',
							filesWithPreviews.length > 0 ? 'flex ' : 'hidden'
						)}
					>
						{filesWithPreviews.map((file, index) => {
							return (
								<FilePreview
									key={index}
									file={file.file}
									previewUrl={file.preview}
									onClose={() => removeFileWithPreview(index)}
								/>
							);
						})}
					</div>

					<MessengerInput
						onPaste={handleOnPaste}
						formValue={formValue}
						setFormValue={setFormValue}
						onSubmit={handleSubmit}
					/>
					{/*  */}
				</div>
				{formValue.length > 0 ? (
					<div className={`${customTheme.textColorPrimary} mb-[4px]`}>
						<IconButton
							tooltipTitle='Send message'
							onClick={handleSubmit}
						>
							<BiSolidSend />
						</IconButton>
					</div>
				) : (
					<div className={`${customTheme.textColorPrimary} mb-[4px]`}>
						<IconButton tooltipTitle='Send a Like'>
							<HiThumbUp />
						</IconButton>
					</div>
				)}
			</section>
		</div>
	);
};

export default Chatbox;
