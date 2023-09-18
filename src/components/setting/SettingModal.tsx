import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Resizable from '../Resizable';
import { Button } from 'antd';
import MenuItemHeader from '../MenuItemHeader';
import { settingMenuItems } from './SettingModalItems';

type SettingModalPropsType = {
	open: boolean;
	onCancel: () => void;
};

const SettingModal: React.FC<SettingModalPropsType> = ({ open, onCancel }) => {
	const draggleRef = useRef<HTMLDivElement>(null);
	const [disabled, setDisabled] = useState(false);
	const bounds = {
		top: -40,
		bottom: 650,
		left: -500,
		right: 1200,
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
	};

	useEffect(() => {}, []);

	return (
		open && (
			<Draggable
				disabled={disabled}
				defaultPosition={{ x: 370, y: 40 }}
				nodeRef={draggleRef}
				bounds={bounds}
			>
				<div ref={draggleRef}>
					<Resizable
						maxWidth={1000}
						minWidth={650}
						bottom={true}
						maxHeight={900}
						minHeight={400}
					>
						<div
							modal-header
							className='absolute flex w-full bg-transparent'
						>
							<div
								className='w-full p-6 bg-transparent'
								onMouseOver={() => {
									if (disabled) {
										setDisabled(false);
									}
								}}
								onMouseOut={() => {
									setDisabled(true);
								}}
							/>
							<Button
								type='text'
								onClick={handleCancel}
								className='font-semibold'
							>
								&#x2715;
							</Button>
						</div>
						<section
							modal-container
							className='w-full h-full border border-black border-opacity-50 shadow-2xl'
						>
							<div className='flex-shrink-0 h-full border-r w-[312px] border-neutral-400 border-opacity-40 overflow-y-auto'>
								{settingMenuItems.map((section, index) => {
									return (
										<>
											<h5
												key={index}
												className='p-2 pl-4 text-sm font-normal text-neutral-500'
											>
												{section.section}
											</h5>
											{section.items.map(
												(item, index) => (
													<MenuItemHeader
														key={index}
														title={item.title}
														icon={item.icon}
														description={
															item.description
														}
														suffix={item.suffix}
													/>
												)
											)}
										</>
									);
								})}
							</div>
							<div className='flex flex-1 overflow-x-hidden overflow-y-auto'>

							</div>
						</section>
					</Resizable>
				</div>
			</Draggable>
		)
	);
};

export default SettingModal;
