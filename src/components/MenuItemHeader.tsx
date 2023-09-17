import React, { ReactNode } from 'react';

type MenuItemHeaderPropsType = {
	icon: ReactNode;
	title: string;
	description?: string;
	descriptionTail?: string;
	suffix?: ReactNode;
};

const MenuItemHeader: React.FC<MenuItemHeaderPropsType> = ({
	icon,
	title,
	description,
	descriptionTail,
	suffix,
}) => {
	return (
		<div className='flex items-center justify-center flex-1 min-w-0 gap-2 p-2 pr-0'>
			{icon}

			<div className='flex flex-col justify-center flex-1 min-w-0 gap-1'>
				<h1 className='p-0 overflow-hidden text-base font-bold leading-none flex-shrink-1 whitespace-nowrap text-ellipsis '>
					{title}
				</h1>
				<div className='flex gap-2 p-0 text-sm text-gray-500 x'>
					<span className='flex-grow-0 min-w-0 overflow-hidden flex-shrink-1 whitespace-nowrap text-ellipsis '>
						{' '}
						{description}
					</span>
					<span className='flex-grow text-sm text-gray-500 whitespace-nowrap'>
						{descriptionTail}
					</span>
				</div>
			</div>
			<span className='flex-shrink-0'>{suffix}</span>
		</div>
	);
};

export default MenuItemHeader;
