import React, { ReactNode } from 'react';
import MyTooltip from './MyTooltip';

type IconButtonPropsType = {
	tooltipTitle: string;
	children: ReactNode;
};

const IconButton: React.FC<IconButtonPropsType> = ({
	tooltipTitle,
	children,
}) => {
	return (
		<MyTooltip title={tooltipTitle}>
			<button className='gap-2 p-1 text-2xl text-inherit hover:brightness-75 '>{children}</button>
		</MyTooltip>
	);
};

export default IconButton;
