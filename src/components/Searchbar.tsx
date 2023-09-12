import React from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchbarPropsType = {
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Searchbar: React.FC<SearchbarPropsType> = ({ placeholder, onChange }) => {
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(e);
		}
	};

	return (
		<>
		
			<div className='relative w-full'>
				<input
					type='text'
					className='block w-full p-2 text-sm text-gray-900 bg-gray-200 bg-opacity-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder={placeholder}
					onChange={(e) => handleOnChange(e)}
					required
				/>
				<div className='absolute inset-y-0 right-0 flex items-center pr-3'>
					<span className='w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white' aria-hidden="true">
						<BsSearch />
					</span>
				</div>
			</div>
		</>
	);
};

export default Searchbar;

{
	/* <Input suffix={<BsSearch />} placeholder={placeholder} onChange={(e) => handleOnChange(e)}/> */
}
