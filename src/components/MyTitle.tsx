import React, { ReactNode } from 'react';

type TitlePropsType = {
	title: string;
	description?: string;
	descriptionTail?: string;
	icon?: ReactNode;
};

const MyTitle: React.FC<TitlePropsType> = ({
	title,
	description,
	descriptionTail,
	icon,
}) => {
	return (
		<div className='flex items-center justify-center flex-1 min-w-0'>
			<div className='flex flex-col justify-center flex-1 min-w-0 gap-1'>
				<span className='p-0 overflow-hidden text-base font-bold leading-none flex-shrink-1 whitespace-nowrap text-ellipsis '>
					{title}
				</span>
				<div className='flex gap-2 p-0 text-sm text-gray-500 x'>
					<span className='flex-grow-0 min-w-0 overflow-hidden flex-shrink-1 whitespace-nowrap text-ellipsis '>
						{' '}
						{description}
					</span>
					<span className='flex-grow text-sm text-gray-500'>
						{descriptionTail}
					</span>
				</div>
			</div>
			<span className='flex-shrink-0 bg-red-400'>
				{icon}
			</span>
		</div>
	);
};

export default MyTitle;
