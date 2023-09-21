import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import React, { ReactNode } from 'react';

type MyTooltipPropsType = {
	children: ReactNode;
	title: string;
	placement?: TooltipPlacement;
};

const MyTooltip: React.FC<MyTooltipPropsType> = ({
	children,
	title,
	placement = 'top',
}) => {
	return (
		<Tooltip
			title={<span className='text-xs text-black'>{title}</span>}
            color='#f7f7f7'
			placement={placement}
			arrow={false}
			mouseEnterDelay={0.6}
			mouseLeaveDelay={0}
		>
			{children}
		</Tooltip>
	);
};

export default MyTooltip;
