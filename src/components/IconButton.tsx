import React, { ReactNode } from 'react';
import MyTooltip from './MyTooltip';

type IconButtonPropsType = {
	tooltipTitle: string;
	children: ReactNode;
	className?:string;
	onClick? : (arg?:any)=>void
	disabled?:boolean;
};

const IconButton: React.FC<IconButtonPropsType> = ({
	tooltipTitle,
	children,
	className,
	onClick,
}) => {

	const handleOnClick = () =>{
		if(onClick){
			onClick()
		}
	}

	return (
		<MyTooltip  title={tooltipTitle}>
			<button className={`gap-2 p-1 text-2xl text-inherit hover:brightness-75 drag-none ${className}`} onClick={handleOnClick}>{children}</button>
		</MyTooltip>
	);
};

export default IconButton;
