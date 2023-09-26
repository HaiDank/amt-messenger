import { Avatar, Button, Tooltip } from 'antd';
import React from 'react';
import {
	BiLogoFacebookCircle,
	BiSolidBell,
	BiSolidEditAlt,
} from 'react-icons/bi';
import { HiThumbUp } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillMinusCircle, AiFillWarning } from 'react-icons/ai';
import MenuItemHeader from '../MenuItemHeader';

const chatOptionItems = [
	{
		title: 'Theme',
		icon: <div className='p-2 mr-2 bg-blue-500 rounded-full' />,
		suffix: (
			<span className='text-lg text-neutral-400'>
				<IoIosArrowForward />
			</span>
		),
	},
	{
		title: 'Emoji',
		icon: (
			<span className='mr-3 text-blue-500'>
				<HiThumbUp />
			</span>
		),
		suffix: (
			<span className='text-lg text-neutral-400'>
				<IoIosArrowForward />
			</span>
		),
	},
	{
		title: 'Edit Nicknames',
		icon: (
			<span className='mr-3 text-black'>
				<BiSolidEditAlt />
			</span>
		),
		suffix: (
			<span className='text-lg text-neutral-400'>
				<IoIosArrowForward />
			</span>
		),
	},
];

const ChatOptions: React.FC = () => {

	

	return (
		<div className='flex flex-col w-[300px] p-3 pt-12 bg-gray-100 h-[500px] shadow-2xl items-center overflow-y-auto scrollbar-none'>
			<div className='flex flex-col items-center gap-5 pt-2 pb-4 list-item-separated'>
				<Avatar
					className='flex-shrink-0'
					size={64}
					src='./src/assets/admin-avatar.png'
				/>
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
								<span className='text-xl'>
									<BiLogoFacebookCircle />
								</span>
							</Button>
						</Tooltip>
						<span className='drop-shadow'>Profile</span>
					</div>
					<div className='flex flex-col items-center '>
						<Tooltip
							title='Mute notifications'
							arrow={false}
							mouseEnterDelay={0.6}
							mouseLeaveDelay={0}
						>
							<Button shape='circle' type='text'>
								<span className='text-xl'>
									<BiSolidBell />
								</span>
							</Button>
						</Tooltip>
						<span className='drop-shadow'>Mute</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-4 list-item-separated'>
				{chatOptionItems.map((item, index) => (
					<MenuItemHeader
						key={index}
						icon={item.icon}
						title={item.title}
						size='small'
						suffix={item.suffix}
					/>
				))}
			</div>
			<div className=' list-item-separated'>
				<MenuItemHeader
					title='Media, files & links'
					size='small'
					suffix={
						<a href='#' className='text-xs text-blue-600'>
							See all
						</a>
					}
				/>
				<div className='flex items-center gap-1 px-2'>
					<div className='w-1/3 bg-green-400 rounded-sm aspect-square'></div>
					<div className='w-1/3 bg-green-400 rounded-sm aspect-square'></div>
					<div className='w-1/3 bg-green-400 rounded-sm aspect-square'></div>
				</div>
			</div>
			<div className='flex flex-col gap-1 list-item-separated'>
				<MenuItemHeader
					icon={
						<span className='mr-2 text-black'>
							<AiFillMinusCircle />
						</span>
					}
					title='Block on Messenger'
					size='small'
				/>
				<MenuItemHeader
					icon={
						<span className='mr-2 text-black'>
							<AiFillMinusCircle />
						</span>
					}
					title='Block on Facebook'
					size='small'
				/>
			</div>
			<div className='list-item-separated'>
				<MenuItemHeader
					icon={
						<span className='mr-2 text-black'>
							<AiFillWarning />
						</span>
					}
					title='Report'
					size='small'
					description='Give feedback or report conversation'
				/>
			</div>
		</div>
	);
};

export default ChatOptions;
