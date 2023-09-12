import React from 'react';
import Resizable from '../../components/Resizable';
import SidebarHeader from '../../components/sidebar/SidebarHeader';
import { RiEditBoxLine } from 'react-icons/ri';
import { Button, Tooltip } from 'antd';
import Chatbox from '../../components/chatbox/Chatbox';

const Chats: React.FC = () => {
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

	return (
		<div className='flex h-full bg-red-400 '>
			<Resizable>
				<SidebarHeader
					title='Chats'
					searchFunction={onChange}
					functionButton={
						<Tooltip title='Compose message' placement='top' arrow={false} mouseEnterDelay={0.6} mouseLeaveDelay={0}> 
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
				<div className='overflow-auto bg-green-400'>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
					<p>asdasd</p>
				</div>
			</Resizable>

			<Chatbox />
		</div>
	);
};

export default Chats;
