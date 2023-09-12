import React from 'react';
import { Avatar, Button, Tooltip } from 'antd';
import { BiSolidPhone } from 'react-icons/bi';
import { PiVideoCameraFill } from 'react-icons/pi';
import { IoSearchSharp } from 'react-icons/io5';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

const functionButtons = [
	{
		tooltip: 'Audio call',
		icon: <BiSolidPhone />,
	},
	{
		tooltip: 'Video call',
		icon: <PiVideoCameraFill />,
	},
	{
		tooltip: 'Message search',
		icon: <IoSearchSharp />,
	},
];

const ChatboxHeader: React.FC = () => {
	return (
		<div className='pt-9 pb-2 px-3 border-b-[1px] border-opacity-40 border-gray-400 bg-white flex justify-between items-center '>
			<div className='flex items-center gap-2'>
				<Avatar />
				<div className='flex flex-col justify-center '>
					<span className='p-0 text-base font-bold leading-tight'>
						User's Name
					</span>
					<span className='p-0 text-sm leading-none text-gray-500'>
						Active now
					</span>
				</div>
			</div>

			<div className='flex items-center gap-5 icon-purple'>
				{functionButtons.map((button, index) => (
					<Tooltip
						key={index}
						title={button.tooltip}
						placement='top'
                        arrow={false}
						mouseEnterDelay={0.6}
						mouseLeaveDelay={0}
					>
						<span className='text-2xl hover:text-violet-900'>{button.icon}</span>
					</Tooltip>
				))}

				<Button
					icon={
						<span className='text-2xl'>
							<HiEllipsisHorizontal />
						</span>
					}
					shape='circle'
					type='text'
				/>
			</div>
		</div>
	);
};

export default ChatboxHeader;
