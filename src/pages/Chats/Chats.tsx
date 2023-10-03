import React from 'react';
import Resizable from '../../components/Resizable';
import SidebarHeader from '../../components/sidebar/SidebarHeader';
import { RiEditBoxLine } from 'react-icons/ri';
import { Button, Tooltip } from 'antd';
import MenuItemHeader from '../../components/MenuItemHeader';
import UserAvatar from '../../components/user/UserAvatar';
import UserCarousel from '../../components/user/UserCarousel';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { setChosenChatboxId } from '../../state/chat/messageSlice';
import { parseSmallDatefromMs } from '../../utils/timeUtils';

const Chats: React.FC = () => {
	const chatAppData = useAppSelector((state) => state.chatapp);
	const dispatch = useAppDispatch();
	const chosenChatboxId = useAppSelector(
		(state) => state.messages.chosenChatboxId
	);
	const uid = useAppSelector(state => state.user.uid)

	const handleChatOptionClick = (id: string) => {
		dispatch(setChosenChatboxId(id));
	};
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		console.log(chatAppData.chatboxes);
	};

	return (
		<div className='flex h-full border-neutral-400 border-opacity-40 border-r-[1px]'>
			<Resizable maxWidth={550} minWidth={270}>
				<SidebarHeader
					title='Chats'
					searchFunction={onChange}
					functionButton={
						<Tooltip
							title='Compose message'
							placement='top'
							arrow={false}
							mouseEnterDelay={0.6}
							mouseLeaveDelay={0}
						>
							<Button
								className='flex items-center justify-center '
								type='text'
								shape='circle'
								icon={
									<span className='text-xl font-bold'>
										<RiEditBoxLine />
									</span>
								}
							/>
						</Tooltip>
					}
				/>
				<div className='overflow-y-auto overscroll-x-contain'>
					<UserCarousel />
					{chatAppData.chatboxes.map((chatbox) => {
						const isYou = chatbox.latestMessage?.uid! === uid
							return (
								<MenuItemHeader
									key={chatbox.chatboxId}
									onClick={() =>
										handleChatOptionClick(chatbox.chatboxId)
									}
									title={chatbox.otherUser!.name!}
									icon={
										<UserAvatar
											online={chatbox.otherUser!.online!}
											src={chatbox.otherUser!.avatarUrl!}
											timeSinceLastOnline={
												chatbox.otherUser!
													.timeLastOnline!
											}
										/>
									}
									description={isYou? `You: ${chatbox.latestMessage?.text}` : `${chatbox.latestMessage?.text}`}
									descriptionTail={parseSmallDatefromMs(
										chatbox.latestMessage?.createdAt
									)}
									active = {chosenChatboxId === chatbox.chatboxId}
									suffix={<UserAvatar size={14} />}
								/>
							);
						})}
						
				</div>
			</Resizable>
		</div>
	);
};

export default Chats;
