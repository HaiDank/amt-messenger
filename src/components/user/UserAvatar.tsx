import { Avatar, Tooltip } from 'antd';
import React from 'react';
import { parseTimeDifferencefromMs } from '../../utils/timeUtils';

type UserAvatarPropsType = {
	tooltip?: string;
	size?: number;
	online?: boolean;
	timeSinceLastOnline?: number;
	src?: string;
};

const UserAvatar: React.FC<UserAvatarPropsType> = ({
	tooltip,
	size = 48,
	online,
	timeSinceLastOnline,
	src,
}) => {

	let badgeStyle = 'absolute bottom-1 min-w-[1.125rem] h-[1.125rem] transform bg-green-400 border-[3px] border-white rounded-full right-0 translate-y-1/4 dark:border-gray-800'
	if (size < 48){
		badgeStyle = 'absolute bottom-[2px] min-w-[.75rem] h-[.75rem] transform bg-green-400 border-2 border-white rounded-full right-0 translate-y-1/4 dark:border-gray-800'
	}
	return (
		<div className='relative flex-shrink-0'>
			<Tooltip
				title={tooltip}
				arrow={false}
				mouseEnterDelay={0.6}
				mouseLeaveDelay={0}
			>
				<Avatar
					size={size}
					className='flex-shrink-0'
					src={src}
				/>
			</Tooltip>
			{online && (
				<span className={badgeStyle} />
			)}
			{timeSinceLastOnline && !online && (parseTimeDifferencefromMs(timeSinceLastOnline) !== null) && (
				<span className=' text-green-400 font-bold text-center absolute bottom-0 py-[1px] leading-3 text-xs w-fit px-1.5 transform bg-green-200 border-[3px] border-white rounded-full -right-1 translate-y-1/4 dark:border-gray-800'>
					{parseTimeDifferencefromMs(timeSinceLastOnline)}
				</span>
			)}
		</div>
	);
};

export default UserAvatar;
