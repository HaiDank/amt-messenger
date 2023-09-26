import React from 'react';
import Resizable from '../../components/Resizable';
import SidebarHeader from '../../components/sidebar/SidebarHeader';
import { RiEditBoxLine } from 'react-icons/ri';
import { Button, Tooltip } from 'antd';
import MenuItemHeader from '../../components/MenuItemHeader';
import UserAvatar from '../../components/user/UserAvatar';
import UserCarousel from '../../components/user/UserCarousel';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { updateChosenChatbox } from '../../state/chat/ChatboxSlice';

const Chats: React.FC = () => {
	const chatAppData = useAppSelector(state => state.chatbox);
	const dispatch = useAppDispatch()
	const chosenChatboxId = chatAppData.chosenChatboxId;

	const handleChatOptionClick = (id: number) => {
		dispatch(updateChosenChatbox(id));
	};
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

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
					{chatAppData.chatDatas.map((chatbox) => {
						if (chosenChatboxId === chatbox.chatboxId) {
							return (
								<MenuItemHeader
									key={chatbox.chatboxId}
									onClick={() => handleChatOptionClick(chatbox.chatboxId)}
									title="User's name"
									icon={<UserAvatar online />}
									description='Vũ Ngọc Hải Đăng: longgggggggg messssssaaaaggggeeeee'
									descriptionTail='· Thu'
									active
									suffix={<UserAvatar size={14} />}
								/>
							);
						}
						return (
							<MenuItemHeader
									key={chatbox.chatboxId}
									onClick={() => handleChatOptionClick(chatbox.chatboxId)}
									title="User's name"
									icon={<UserAvatar online />}
									description='Vũ Ngọc Hải Đăng: longgggggggg messssssaaaaggggeeeee'
									descriptionTail='· Thu'
									suffix={<UserAvatar size={14} />}
								/>
						)
					})}
				</div>
			</Resizable>
		</div>
	);
};

export default Chats;
