import { Tooltip } from 'antd';
import React, { ReactNode } from 'react';

type IconButtonPropsType = {
    tooltipTitle: string,
    children: ReactNode
}

const IconButton: React.FC<IconButtonPropsType> = ({tooltipTitle, children}) => {
	return (
		<Tooltip
			
			title={tooltipTitle}
			placement='top'
			arrow={false}
			mouseEnterDelay={0.6}
			mouseLeaveDelay={0}
		>
			<button className='text-2xl icon-button'>
				{children}
			</button>
		</Tooltip>
	);
};

export default IconButton;
