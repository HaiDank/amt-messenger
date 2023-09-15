import React from 'react';

const Test: React.FC = () => {
	return (
		<div className='flex w-full h-full max-w-full '>
			<div className='flex flex-auto max-w-[550px] min-w-[200px]'>
				<div className='flex items-center flex-1 min-w-0 border-2 border-black h-1/2'>
					<span className='flex-shrink-0 p-4 bg-red-400'></span>
					<div className='flex-1 max-w-2xl p-4 overflow-hidden bg-green-400 whitespace-nowrap text-ellipsis'>
						<span className='min-w-0'>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Aliquam
						</span>
					</div>
					<span className='flex-shrink-0 p-4 bg-yellow-400 '></span>
				</div>
			</div>
		</div>
	);
};

export default Test;
