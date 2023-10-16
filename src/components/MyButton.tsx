import React, { ReactNode } from 'react';
import MyTooltip from './MyTooltip';

type MyButtonType = {
	children: ReactNode;
	onClick: () => void;
	tooltip?: string;
    className?: string;
    disabled?: boolean
};

const MyButton: React.FC<MyButtonType> = ({ children, onClick, tooltip, className, disabled }) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return tooltip ? (
		<MyTooltip title={tooltip}>
			<button disabled={disabled} className={`bg-opacity-50 rounded-full hover:bg-opacity-100 ${className}`} onClick={handleClick}>
				{children}
			</button>
		</MyTooltip>
	) : (
		<button disabled={disabled} className={`bg-opacity-50 rounded-full hover:bg-opacity-100 ${className}`} onClick={handleClick}>
			{children}
		</button>
	);
};

export default MyButton;
