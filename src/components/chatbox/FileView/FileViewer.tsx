import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import Resizable from '../../Resizable';
import Draggable, { DraggableEvent } from 'react-draggable';
import { useAppSelector } from '../../../hooks/useAppRedux';
import UserAvatar from '../../user/UserAvatar';
import { parseDatefromMs } from '../../../utils/timeUtils';
import MyButton from '../../MyButton';
import { IconBase } from 'react-icons';
import {
	AiFillInfoCircle,
	AiOutlineZoomIn,
	AiOutlineZoomOut,
} from 'react-icons/ai';
import { BsBoxArrowUp } from 'react-icons/bs';
import { LiaDownloadSolid } from 'react-icons/lia';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type props = {
	open: boolean;
	onCancel: () => void;
};

const FileViewer: React.FC<props> = ({ open, onCancel }) => {
	const draggleRef = useRef<HTMLDivElement>(null);
	const [disabled, setDisabled] = useState(false);
	const viewPort = useAppSelector((state) => state.viewPort);
	const theme = useAppSelector((state) => state.theme);
	const otherUser = useAppSelector(
		(state) => state.messages.chosenChatbox?.otherUser
	);

	const bounds = {
		top: -30,
		bottom: 650,
		left: -500,
		right: 1200,
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
	};

	const handleDrag = (e: DraggableEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};

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
						maxWidth={viewPort.width - 50}
						minWidth={900}
						bottom={true}
						maxHeight={viewPort.height - 25}
						minHeight={500}
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
							className={`pt-7 gap-2 flex flex-col items-center w-full h-full border border-black border-opacity-50 drag-none shadow-2xl scroll-smooth bg-opacity-80  backdrop-blur-xl ${theme.popupBgColor}`}
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
												<IconBase>
													<AiFillInfoCircle />
												</IconBase>
											</MyButton>
										</li>
									</ul>
								</div>

								{/* end of header func bar */}
							</div>
							{/* end of header */}

							{/* main content */}

							<div className='flex items-center justify-between flex-grow w-full gap-2 px-2 overflow-hidden h-3/6'>
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
								<div className='h-full '>
									<img
										className='max-w-full max-h-full aspect-auto'
										src='https://picsum.photos/1920/1080'
									/>
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

							{/* footer carousel */}
							<div></div>
							{/* end of footer */}
						</section>
					</Resizable>
				</div>
			</Draggable>
		)
	);
};

export default FileViewer;
