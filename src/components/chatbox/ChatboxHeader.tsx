import React from 'react';
import { Button, Popover } from 'antd';
import { BiSolidPhone, BiSolidVideo } from 'react-icons/bi';
import { IoSearchSharp } from 'react-icons/io5';
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import IconButton from '../IconButton';
import MenuItemHeader from '../MenuItemHeader';
import UserAvatar from '../user/UserAvatar';
import ChatOptions from './ChatOptions';
import { useAppSelector } from '../../hooks/useAppRedux';
import MyTooltip from '../MyTooltip';

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
	const customTheme = useAppSelector((state) => state.customTheme);

	return (
		<div className='flex-shrink-0 px-2 border-b-[1px] border-opacity-60 border-gray-300 bg-inherit text-inherit flex justify-between items-center gap-2 min-w-0 min-h-0'>
			<MenuItemHeader
				title="User's name"
				icon={<UserAvatar online size={36} />}
				description='Active 4m ago'
			/>

			<div
				className={`flex items-center flex-shrink-0 gap-2 p-1 text-2xl ${customTheme.textColorSecondary} whitespace-nowrap`}
			>
				{functionButtons.map((button, index) => (
					<IconButton key={index} tooltipTitle={button.tooltip}>
						{button.icon}
					</IconButton>
				))}
				<MyTooltip title='Chat Options'>
					<Popover
						trigger='click'
						content={<ChatOptions />}
						arrow={false}
						placement='bottomRight'
					>
						<Button shape='circle' type='text'>
							<span className={`text-2xl ${customTheme.textColorSecondary}`}>
								<HiEllipsisHorizontal />
							</span>
						</Button>
					</Popover>
				</MyTooltip>
			</div>
		</div>
	);
};

export default ChatboxHeader;
