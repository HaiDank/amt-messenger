import React from 'react';
import { Button, Popover, Tooltip } from 'antd';
import {
	BiSolidPhone,
	BiSolidVideo,
} from 'react-icons/bi';
import { IoSearchSharp } from 'react-icons/io5';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import IconButton from '../IconButton';
import MenuItemHeader from '../MenuItemHeader';
import UserAvatar from '../user/UserAvatar';
import ChatOptions from './ChatOptions';

const functionButtons = [
	{
		tooltip: 'Audio call',
		icon: <BiSolidPhone />,
	},
	{
		tooltip: 'Video call',
		icon: <BiSolidVideo />,
	},
	{
		tooltip: 'Message search',
		icon: <IoSearchSharp />,
	},
];


const ChatboxHeader: React.FC = () => {
	return (
		<div className='flex-shrink-0 px-2 border-b-[1px] border-opacity-60 border-gray-300 bg-white flex justify-between items-center gap-2 min-w-0 min-h-0'>
			
			<MenuItemHeader title="User's name" icon={<UserAvatar online size={36}/>} description='Active 4m ago'/>

			<div className='flex items-center flex-shrink-0 gap-2 icon-purple whitespace-nowrap'>
				{functionButtons.map((button, index) => (
					<IconButton key={index} tooltipTitle={button.tooltip}>
						{button.icon}
					</IconButton>
				))}

				<Popover
					trigger='click'
					content={<ChatOptions/>}
					arrow={false}
					placement='bottomRight'
				>
					<Tooltip
						title='Chat Options'
						arrow={false}
						mouseEnterDelay={0.6}
						mouseLeaveDelay={0}
					>
						<Button shape='circle' type='text'>
							<span className='text-2xl'>
								<HiEllipsisHorizontal />
							</span>
						</Button>
					</Tooltip>
				</Popover>
			</div>
		</div>
	);
};

export default ChatboxHeader;
