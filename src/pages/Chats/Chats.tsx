import React from 'react';
import Resizable from '../../components/Resizable';
import SidebarHeader from '../../components/sidebar/SidebarHeader';
import { RiEditBoxLine } from 'react-icons/ri';
import { Button, Tooltip } from 'antd';
import ChatboxNavigationItem from '../../components/chatbox/ChatboxNavigationItem';

const Chats: React.FC = () => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

	return (
		<div className='flex h-full border-gray-400 border-opacity-40 border-r-[1px]'>
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
								size='large'
								icon={
									<span className='text-xl font-bold'>
										<RiEditBoxLine />
									</span>
								}
							/>
						</Tooltip>
					}
				/>
				<div className='overflow-y-auto'>
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
					<ChatboxNavigationItem />
				</div>
			</Resizable>
		</div>
	);
};

export default Chats;
