import React, { ReactNode } from 'react';
import { useAppSelector } from '../hooks/useAppRedux';
import clsx from 'clsx';

type MenuItemHeaderPropsType = {
	icon?: ReactNode;
	title: string;
	size?: string;
	onClick?: () => void;
	description?: string;
	descriptionTail?: string;
	suffix?: ReactNode;
	active?: boolean;
};

const MenuItemHeader: React.FC<MenuItemHeaderPropsType> = ({
	icon,
	title,
	size = 'normal',
	description,
	descriptionTail,
	suffix,
	onClick,
	active,
}) => {
	const theme = useAppSelector((state) => state.theme);

	const handleOnClick = () => {
		if (onClick) {
			onClick();
		}
	};

	let titleStyle = 'font-bold text-base';
	let descriptionStyle = 'text-sm';

	if (size === 'small') {
		titleStyle = 'font-bold text-sm';
		descriptionStyle = 'text-xs';
	}

	return (
		<div
			onClick={handleOnClick}
			className={clsx(
				'flex items-center text-inherit justify-center flex-1 min-w-0 gap-3 p-[10px]',
				active && `${theme.menuActive}`, !description && 'py-4'
			)}
		>
			{icon}
			<div className='flex flex-col justify-center flex-1 min-w-0'>
				<h1
					className={`p-0 overflow-hidden text-inherit text-base ${titleStyle} flex-shrink-1 whitespace-nowrap text-ellipsis`}
				>
					{title}
				</h1>
				{description && (
					<div
						className={`flex gap-2 p-0 ${descriptionStyle} ${theme.textFade} select-none`}
					>
						<span
							className={`flex-grow-0 min-w-0 p-0 overflow-hidden flex-shrink-1 whitespace-nowrap text-ellipsis `}
						>
							{description}
						</span>
						<span className='flex-grow whitespace-nowrap'>
							{descriptionTail}
						</span>
					</div>
				)}
			</div>
			<span className='flex-shrink-0'>{suffix}</span>
		</div>
	);
};

export default MenuItemHeader;
