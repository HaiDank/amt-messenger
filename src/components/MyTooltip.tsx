import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import React, { ReactNode } from 'react';
import { useAppSelector } from '../hooks/useAppRedux';

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

	const theme = useAppSelector(state => state.theme)

	return (
		<Tooltip
			title={<span className={`${theme.textNormal} text-xs`}>{title}</span>}
            color={`${theme.popupBgHex}`}
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
