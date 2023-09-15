import React from 'react';

const ChatboxTitle: React.FC = () => {
	return (
		<div className='flex flex-col justify-center flex-1 min-w-0 gap-1'>
			<span className='p-0 overflow-hidden text-base font-bold leading-none flex-shrink-1 whitespace-nowrap text-ellipsis '>
				User's Name Longggggggggggggggggggggggggg
			</span>
			<div className='flex gap-2 p-0 text-sm text-gray-500 x'>
				<span className='flex-grow-0 min-w-0 overflow-hidden flex-shrink-1 whitespace-nowrap text-ellipsis '> Active nowsadddddddddddddddddddddddddddddddd</span>
				<span className='flex-grow text-sm text-gray-500'>·Wed</span>
			</div>
		</div>
	);
};

export default ChatboxTitle;
