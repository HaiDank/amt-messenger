import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import MyTooltip from '../MyTooltip';

export type SidebarItemPropsType = {
    title: string,
	path: string;
	icon: ReactNode;
	active?: boolean;
	onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemPropsType> = ({
    title,
	path,
	icon,
	active,
	onClick,
}) => {

    
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<MyTooltip title={title}>
			<Link
				to={path}
				onClick={handleClick}
				className={clsx(
					'py-3 px-5 rounded-lg font-bold text-xl text-gray-500 text-opacity-80',
					active && 'link-active'
				)}
			>
				{icon}
			</Link>
		</MyTooltip>
	);
};

export default SidebarItem;
