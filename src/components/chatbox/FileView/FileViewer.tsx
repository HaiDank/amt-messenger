import { Button, Popover } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react';
import Resizable from '../../Resizable';
import Draggable, { DraggableEvent } from 'react-draggable';
import { useAppDispatch, useAppSelector } from '../../../hooks/useAppRedux';
import UserAvatar from '../../user/UserAvatar';
import { parseDatefromMs } from '../../../utils/timeUtils';
import MyButton from '../../MyButton';
import { IconBase } from 'react-icons';
import {
	AiFillInfoCircle,
	AiOutlineZoomIn,
	AiOutlineZoomOut,
} from 'react-icons/ai';
import { BsBoxArrowUp, BsFillPlayFill } from 'react-icons/bs';
import { LiaDownloadSolid } from 'react-icons/lia';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
	DocumentData,
	collection,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	startAfter,
} from 'firebase/firestore';
import useIntersectionObserver from '../../../hooks/useIntersectionObserver';
import {
	FileInfo,
	addFiles,
	loadFiles,
	setChosenFileIndex,
	setChosenFileUrl,
	setOpenFileView,
	wipeFetchedFiles,
} from '../../../state/chat/fileViewSlice';
import { db, storage } from '../../../config/firebase';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import clsx from 'clsx';
import './file-view.css';
import { FirebaseStorage, getMetadata, ref } from 'firebase/storage';
import { parseBytes } from '../../../utils/fileSizeUtils';

type props = {
	open: boolean;
};

const FileViewer: React.FC<props> = ({ open }) => {
	const [disabled, setDisabled] = useState(true);
	const [lastFile, setLastFile] = useState<DocumentData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [hasNext, setHasNext] = useState(true);
	const [chosenFile, setChosenFile] = useState<FileInfo | null>(null);
	const [originalDimensions, setOriginalDimensions] = useState<{
		width: number;
		height: number;
	}>({ width: 0, height: 0 });

	const previewWidth = `min-w-[50px] max-w-[50px]`;
	const containerPadding = `px-[calc(50%-25px)]`;

	const draggleRef = useRef<HTMLDivElement>(null);
	const previewContainerRef = useRef<HTMLDivElement>(null);

	const lastMessageRef = useIntersectionObserver<HTMLDivElement>(() => {
		if (!isLoading && hasNext && lastFile) {
			fetchNextFiles();
		}
	}, [!isLoading, hasNext]);

	const dispatch = useAppDispatch();
	const viewPort = useAppSelector((state) => state.viewPort);
	const theme = useAppSelector((state) => state.theme);

	const otherUser = useAppSelector(
		(state) => state.messages.chosenChatbox?.otherUser
	);
	const fileView = useAppSelector((state) => state.fileView);

	const bounds = {
		top: -30,
		bottom: 650,
		left: -500,
		right: 1200,
	};

	const handleCancel = () => {
		dispatch(setOpenFileView(false));
		dispatch(setChosenFileIndex(0));
		dispatch(setChosenFileUrl(''));
	};

	const handleDrag = (e: DraggableEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const messagesRef = collection(
		db,
		`chat-box/${fileView.chosenChatboxFileView?.chatboxId}/messages`
	);

	const fetchFiles = () => {
		setIsLoading(true);
		const q = query(
			messagesRef,
			orderBy('createdAt', 'desc'),
			orderBy('mediaUrl'),
			limit(15)
		);
		console.log('fetchfirst');

		const unsubscribe = onSnapshot(q, (messageSnapshot) => {
			if (!messageSnapshot.empty) {
				let data: FileInfo[] = [];

				messageSnapshot.docs.forEach((doc) => {
					if (
						doc &&
						doc.data() &&
						doc.data().mediaType.split('/')[0] !== 'audio'
					)
						data.push({
							name: doc
								.data()
								.mediaUrl.split(/%2..*%2F(.*?)\?alt/)[1],
							url: doc.data().mediaUrl,
							fileType: doc.data().mediaType,
							createdAt: doc.data().createdAt.toDate().getTime(),
						} as FileInfo);
				});

				setLastFile(
					messageSnapshot.docs[messageSnapshot.docs.length - 1]
				);

				console.log(
					messageSnapshot.docs[messageSnapshot.docs.length - 1]
				);

				if (data.length > 0) {
					dispatch(loadFiles(data));
				}
			}
			setIsLoading(false);
		});

		return unsubscribe;
	};

	const fetchNextFiles = () => {
		setIsLoading(true);
		console.log('fetchnext');
		const q = query(
			messagesRef,
			orderBy('createdAt', 'desc'),
			orderBy('mediaUrl'),
			limit(15),
			startAfter(lastFile)
		);

		getDocs(q).then((messageSnapshot) => {
			if (messageSnapshot.empty) {
				setHasNext(false);
				setIsLoading(false);

				return;
			}

			let data: FileInfo[] = [];

			messageSnapshot.docs.forEach((doc) => {
				if (
					doc &&
					doc.data() &&
					doc.data().mediaType.split('/')[0] !== 'audio'
				)
					data.push({
						name: doc
							.data()
							.mediaUrl.split(/%2..*%2F(.*?)\?alt/)[1],
						url: doc.data().mediaUrl,
						fileType: doc.data().mediaType,
						createdAt: doc.data().createdAt.toDate().getTime(),
					} as FileInfo);
			});

			setLastFile(messageSnapshot.docs[messageSnapshot.docs.length - 1]);

			if (data.length <= 0) {
				setHasNext(false);
				setIsLoading(false);
				return;
			}

			dispatch(addFiles(data));
			setIsLoading(false);

			if (messageSnapshot.docs.length < 15) {
				setHasNext(false);
			}
		});
	};

	const getRefFromURL = (storage: FirebaseStorage, url: string) => {
		const storagePrefix = 'https://firebasestorage.googleapis.com/v0/b/';
		if (!url.startsWith(storagePrefix)) {
			throw new Error('Not a valid Firebase Storage URL');
		}

		const path = decodeURIComponent(url.split('/o/')[1].split('?')[0]);
		return ref(storage, path);
	};

	const fetchChosenFile = async (file: FileInfo) => {
		const storageRef = getRefFromURL(storage, file.url);
		const metaData = await getMetadata(storageRef);
		console.log('meta', metaData);
		setChosenFile({
			...file,
			name: metaData.name,
			size: metaData.size,
		});
	};

	const centerSelectedItem = (index: number) => {
		if (previewContainerRef.current) {
			const container = previewContainerRef.current;

			const scrollToLeft = index * 58;
			container.scrollTo({ left: scrollToLeft, behavior: 'smooth' });
		}
	};

	const handleImageLoad = (
		event: React.SyntheticEvent<HTMLImageElement, Event>
	) => {
		setOriginalDimensions({
			width: event.currentTarget.naturalWidth,
			height: event.currentTarget.naturalHeight,
		});
	};

	// useEffect

	// useEffect(() => {
	// 	dispatch(wipeFetchedFiles());
	// }, [fileView.chosenChatboxFileView]);

	useEffect(() => {
		const unsubscribe = fetchFiles();

		window.addEventListener('beforeunload', () => {
			if (unsubscribe) {
				unsubscribe();
				dispatch(wipeFetchedFiles());
			}
		});

		return () => {
			if (unsubscribe) {
				unsubscribe();
				dispatch(wipeFetchedFiles());
			}
		};
	}, [fileView.chosenChatboxFileView]);

	useEffect(() => {
		console.log('loading', isLoading);

		if (isLoading || fileView.fileList.length <= 0) {
			return;
		}

		const index = fileView.chosenFileIndex;
		console.log('useeffect chosen index: ', index);
		fetchChosenFile(fileView.fileList[index]);
		centerSelectedItem(index);
	}, [fileView.chosenFileIndex, isLoading]);

	return (
		open && (
			<Draggable
				disabled={disabled}
				defaultPosition={{ x: 170, y: 40 }}
				nodeRef={draggleRef}
				bounds={bounds}
				onDrag={handleDrag}
			>
				<div ref={draggleRef}>
					<Resizable
						maxWidth={viewPort.width}
						minWidth={viewPort.width / 2}
						bottom={true}
						maxHeight={viewPort.height}
						minHeight={viewPort.height / 2}
					>
						<div className='absolute z-40 flex w-full bg-transparent'>
							<div
								className='w-full p-4 bg-transparent'
								onMouseOver={() => {
									if (disabled) {
										setDisabled(false);
									}
								}}
								onMouseOut={() => {
									setDisabled(true);
								}}
							/>
							<Button
								type='text'
								onClick={handleCancel}
								className='font-semibold'
							>
								&#x2715;
							</Button>
						</div>

						<section
							className={`pt-7 pb-3 gap-2 flex flex-col items-center w-full h-full border border-black border-opacity-50 drag-none shadow-2xl scroll-smooth bg-opacity-80  backdrop-blur-xl ${theme.popupBgColor} overflow-hidden`}
						>
							{/* header */}
							<div className='relative flex items-center justify-center w-full '>
								<div className='flex items-center justify-center gap-2 select-none drag-none'>
									<div>
										<UserAvatar
											src={otherUser?.avatarUrl!}
											size={32}
										/>
									</div>
									<div className={`flex flex-col `}>
										<div className='font-bold text-base`'>
											{otherUser?.name!}
										</div>
										<div
											className={`font-semibold ${theme.textFade} text-sm`}
										>
											{parseDatefromMs(
												otherUser?.timeLastOnline!
											)}
										</div>
									</div>
								</div>

								{/* header func bar */}

								<div className='absolute right-8'>
									<ul className='flex items-center justify-center gap-1'>
										<li>
											<MyButton
												tooltip='Zoom out'
												onClick={() => {}}
												className='p-2 text-xl hover:bg-neutral-200'
											>
												<IconBase>
													<AiOutlineZoomOut />
												</IconBase>
											</MyButton>
										</li>
										<li>
											<MyButton
												tooltip='Zoom in'
												onClick={() => {}}
												className='p-2 text-xl hover:bg-neutral-200'
											>
												<IconBase>
													<AiOutlineZoomIn />
												</IconBase>
											</MyButton>
										</li>
										<li>
											<MyButton
												tooltip='Forward'
												onClick={() => {}}
												className='p-2 text-xl hover:bg-neutral-200'
											>
												<IconBase>
													<BsBoxArrowUp />
												</IconBase>
											</MyButton>
										</li>
										<li>
											<MyButton
												tooltip='Download'
												onClick={() => {}}
												className='p-2 text-xl hover:bg-neutral-200'
											>
												<IconBase>
													<LiaDownloadSolid />
												</IconBase>
											</MyButton>
										</li>
										<li>
											<MyButton
												tooltip='Info'
												onClick={() => {}}
												className='p-2 text-xl hover:bg-neutral-200'
											>
												<Popover
													trigger='click'
													arrow={false}
													placement='bottom'
													content={
														<div className='flex flex-col'>
															<h1 className='flex items-center justify-center w-full font-bold'>
																Info
															</h1>
															<p>
																Name:{' '}
																{
																	chosenFile?.name
																}
															</p>
															<p>
																Uploaded:{' '}
																{parseDatefromMs(
																	chosenFile?.createdAt!
																)}
															</p>
															<p>
																Size:{' '}
																{parseBytes(
																	chosenFile?.size!
																)}
															</p>
															{chosenFile?.fileType.split(
																'/'
															)[0] ===
																'image' && (
																<p>
																	Dimension:{' '}
																	{
																		originalDimensions.width
																	}{' '}
																	x{' '}
																	{
																		originalDimensions.height
																	}
																</p>
															)}
														</div>
													}
												>
													<IconBase>
														<AiFillInfoCircle />
													</IconBase>
												</Popover>
											</MyButton>
										</li>
									</ul>
								</div>

								{/* end of header func bar */}
							</div>
							{/* end of header */}

							{/* main content */}

							<div className='flex items-center justify-between flex-1 w-full gap-2 px-2 overflow-hidden'>
								<div className='flex-shrink-0'>
									<MyButton
										className='p-2 text-xl hover:bg-neutral-200'
										tooltip='Newer'
										onClick={() => {}}
									>
										<IconBase>
											<IoIosArrowBack />
										</IconBase>
									</MyButton>
								</div>

								<div className='flex items-center justify-center w-full h-full'>
									{chosenFile?.fileType.split('/')[0] ===
									'image' ? (
										<img
											className='object-center max-w-full max-h-full aspect-auto'
											src={chosenFile?.url!}
											onLoad={handleImageLoad}
										/>
									) : (
										<VideoPlayer
											videoStyle='max-h-full'
											src={chosenFile?.url!}
										/>
									)}
								</div>

								<div className='flex-shrink-0'>
									<MyButton
										className='p-2 text-xl hover:bg-neutral-200'
										tooltip='Older'
										onClick={() => {}}
									>
										<IconBase>
											<IoIosArrowForward />
										</IconBase>
									</MyButton>
								</div>
							</div>

							{/* end of main content */}

							{/* footer carousel/ preview container */}
							<div
								ref={previewContainerRef}
								className={`flex items-center w-full gap-2 ${containerPadding} py-1 overflow-x-scroll `}
							>
								{fileView.fileList.length > 0 &&
									fileView.fileList.map(
										(file, index, filesList) => (
											<div
												key={index}
												ref={
													index ===
													filesList.length - 1
														? lastMessageRef
														: null
												}
												onClick={() =>
													dispatch(
														setChosenFileIndex(
															index
														)
													)
												}
												className={clsx(
													`relative flex items-center justify-center overflow-hidden rounded ${previewWidth} aspect-square`,
													index ===
														fileView.chosenFileIndex &&
														'solid-shadow-around border-2 border-white'
												)}
											>
												{file.fileType.split('/')[0] ===
												'image' ? (
													<img
														src={file.url}
														className='object-cover w-full h-full aspect-auto'
													/>
												) : (
													<>
														<video
															className='object-cover w-full h-full'
															src={file.url}
															disableRemotePlayback
															disablePictureInPicture
														/>
														<div className='absolute text-white '>
															<BsFillPlayFill />
														</div>
													</>
												)}
											</div>
										)
									)}
							</div>
							{/* end of footer */}
						</section>
					</Resizable>
				</div>
			</Draggable>
		)
	);
};

export default memo(FileViewer);
