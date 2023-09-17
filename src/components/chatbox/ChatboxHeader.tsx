import React from 'react';
import { Avatar, Button, Popover, Tooltip } from 'antd';
import {
	BiLogoFacebookCircle,
	BiSolidBell,
	BiSolidPhone,
	BiSolidVideo,
} from 'react-icons/bi';
import { IoSearchSharp } from 'react-icons/io5';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import IconButton from '../IconButton';
import MenuItemHeader from '../MenuItemHeader';
import UserAvatar from '../user/UserAvatar';

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

const chatOptionsContent = (
	<div className='flex flex-col w-[300px] p-2 pt-12 bg-gray-100 h-[500px] shadow-2xl items-center'>
		<div className='flex flex-col items-center gap-6 list-item-separated'>
			<Avatar className='flex-shrink-0' size={64} />
			<span className='font-bold'>User's Name</span>
			<div className='flex items-center gap-8'>
				<div className='flex flex-col items-center'>
					<Tooltip
						title='View profile'
						arrow={false}
						mouseEnterDelay={0.6}
						mouseLeaveDelay={0}
					>
						<Button shape='circle' type='text'>
							<span className='text-2xl'>
								<BiLogoFacebookCircle />
							</span>
						</Button>
					</Tooltip>
					<span className='drop-shadow'>Profile</span>
				</div>
				<div className='flex flex-col items-center'>
					<Tooltip
						title='Mute notifications'
						arrow={false}
						mouseEnterDelay={0.6}
						mouseLeaveDelay={0}
					>
						<Button shape='circle' type='text'>
							<span className='text-2xl'>
								<BiSolidBell />
							</span>
						</Button>
					</Tooltip>
					<span className='drop-shadow'>Mute</span>
				</div>
			</div>
		</div>
		<div className='list-item-separated'>a</div>
		<div className='list-item-separated'>b</div>
		<div className='list-item-separated'>c</div>
	</div>
);

const ChatboxHeader: React.FC = () => {
	return (
		<div className='pb-2 px-3 border-b-[1px] border-opacity-60 border-gray-300 bg-white flex justify-between items-center gap-2 min-w-0 min-h-0'>
			
			<MenuItemHeader title="User's name" icon={<UserAvatar online size={36}/>} description='Active 4m ago'/>

			<div className='flex items-center flex-shrink-0 gap-2 icon-purple whitespace-nowrap'>
				{functionButtons.map((button, index) => (
					<IconButton key={index} tooltipTitle={button.tooltip}>
						{button.icon}
					</IconButton>
				))}

				<Popover
					trigger='click'
					content={chatOptionsContent}
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
