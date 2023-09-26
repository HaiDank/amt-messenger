import React, { useState } from 'react';
import { Avatar, Button, Popover, Tooltip } from 'antd';
import SidebarItem from './SidebarItem';
import useAppRoutes from '../../hooks/useAppRoutes';
import { BsFillGearFill, BsMessenger } from 'react-icons/bs';
import SettingModal from '../setting/SettingModal';
import { useAppSelector } from '../../hooks/useAppRedux';

const SidebarOption: React.FC = () => {
	const [clicked, setClicked] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const routes = useAppRoutes();
	const user = useAppSelector(state => state.user)

	const handlePreferenceClick = () => {
		setOpenModal(true);
		setClicked(false);
	};

	const handleProfileClick = (open: boolean) => {
		setClicked(open);
	};

	return (
		<>
			<div className='z-40 relative w-[70px] flex flex-col  items-center flex-shrink-0 bg-opacity-50 bg-gray-400 float-left'>
				<div className='flex flex-col items-center flex-auto '>
					<div className='m-2 font-bold '>
						<BsMessenger />
					</div>

					{routes.map((route, index) => (
						<SidebarItem
							key={index}
							title={route.title}
							path={route.path}
							icon={route.icon}
							active={route.active}
						/>
					))}
				</div>
				<Tooltip
					placement='top'
					arrow={false}
					title='Profile Menu'
					mouseEnterDelay={0.7}
					mouseLeaveDelay={0}
				>
					<Popover
						overlayInnerStyle={{
							borderRadius: '0.1rem',
							padding: '0.25rem',
						}}
						content={
							<Button
								size='large'
								className='flex items-center gap-2 text-lg font-semibold'
								onClick={handlePreferenceClick}
								icon={<BsFillGearFill />}
								type='text'
								block
							>
								Preferences
							</Button>
						}
						arrow={false}
						trigger='click'
						open={clicked}
						onOpenChange={handleProfileClick}
					>
						<div className='p-2 m-1'>
							<Avatar
								src={user.avatarURL}
								size='large'
							/>
						</div>
					</Popover>
				</Tooltip>
			</div>
			<SettingModal
				open={openModal}
				onCancel={() => setOpenModal(false)}
			/>
		</>
	);
};

export default SidebarOption;
