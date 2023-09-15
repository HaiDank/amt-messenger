import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import Resizable from './Resizable';
import { Button } from 'antd';

type SettingModalPropsType = {
	open: boolean;
	onCancel: () => void;
};

const SettingModal: React.FC<SettingModalPropsType> = ({ open, onCancel }) => {
	const draggleRef = useRef<HTMLDivElement>(null);
	const [disabled, setDisabled] = useState(false);
	const bounds = {
		top: -40,
		bottom: 690,
	}

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
				defaultPosition={{ x: 150, y: 80 }}
				nodeRef={draggleRef}
				bounds={bounds}
			>
				<div ref={draggleRef} >
					<Resizable
						maxWidth={1000}
						minWidth={500}
						bottom={true}
						maxHeight={800}
						minHeight={500}
					>
						<div
							modal-header
							className='absolute flex w-full bg-green-400'
						>
							<div
							className='w-full p-6 bg-blue-400'
								onMouseOver={() => {
									if (disabled) {
										setDisabled(false);
									}
								}}
								onMouseOut={() => {
									setDisabled(true);
								}}
							/>
							<Button type='text' onClick={handleCancel} className='font-semibold hover:bg-red-400'>&#x2715;</Button>
						</div>
						<div
							modal-container
							className='w-full h-full bg-red-400'
						>
							asdasdasdasdasdasd
						</div>
					</Resizable>
				</div>
			</Draggable>
		)
	);
};

export default SettingModal;

{
	/* <Modal */
}
// 	title={

// 	}
// 	onCancel={handleCancel}
// 	open={open}
// 	footer={null}
// 	closeIcon={<span>&#x2715;</span>}
// 	mask={false}
// 	modalRender={(modal) => (

// 	)}
// >
// 	fghfghfgh
// </Modal>

{
	/* <div
			className='absolute left-0 w-full p-6 top-1'
			onMouseOver={() => {
				if (disabled) {
					setDisabled(false);
				}
			}}
			onMouseOut={() => {
				setDisabled(true);
			}}
		></div> */
}

// <Draggable
// 	disabled={disabled}
// 	bounds={bounds}
// 	nodeRef={draggleRef}
// 	onStart={(event, uiData) => onStart(event, uiData)}
// >
// 	<div ref={draggleRef}>
// 		<Resizable
// 			maxWidth={1500}
// 			minWidth={500}
// 			bottom={true}
// 			maxHeight={1000}
// 			minHeight={600}
// 		>
// 			{modal}
// 		</Resizable>
// 	</div>
// </Draggable>
