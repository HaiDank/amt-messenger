import React, { useRef, useState } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import Resizable from '../Resizable';
import { Button, Select } from 'antd';
import MenuItemHeader from '../MenuItemHeader';
import { BiSolidBell, BiSolidShield } from 'react-icons/bi';
import {
	BsFillFileEarmarkTextFill,
	BsFillGearFill,
	BsFillMoonFill,
	BsFillQuestionCircleFill,
} from 'react-icons/bs';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { IoWarning } from 'react-icons/io5';
import { GiEarthAsiaOceania } from 'react-icons/gi';
import { ImKey } from 'react-icons/im';
import { TbLogout } from 'react-icons/tb';
import { Switch } from 'antd';
import { useAppSelector } from '../../hooks/useAppRedux';
import MyTooltip from '../MyTooltip';
import SignOutPopup from '../../pages/Auth/SignOutPopup';

const iconStyle =
	'relative text-white w-8 text-center text-lg rounded-full aspect-square flex items-center justify-around';

type SettingModalPropsType = {
	open: boolean;
	onCancel: () => void;
};

const SettingModal: React.FC<SettingModalPropsType> = ({ open, onCancel }) => {
	const theme = useAppSelector((state) => state.theme);
	const [activeStatus, setActiveStatus] = useState(true);
	const [openLogout, setOpenLogoutModal] = useState(false);

	const settingMenuItems = [
		{
			section: 'Preferences',
			items: [
				{
					title: 'General',
					icon: (
						<span className={`bg-black ${iconStyle}`}>
							{' '}
							<BsFillGearFill />
						</span>
					),
					description: undefined,
					suffix: undefined,
					onClick: undefined,
				},
				{
					title: 'Active Status',
					icon: (
						<span className={`bg-emerald-500 ${iconStyle} `}>
							<span className='p-2 bg-white rounded-full aspect-square just'></span>
							<span className='absolute p-[3px] bg-white border-2 rounded-full bottom-[6px] right-[6px] border-emerald-500'></span>
						</span>
					),
					description: 'On',
					suffix: undefined,
					onClick: undefined,
				},
				{
					title: 'Notifications',
					icon: (
						<span className={`bg-violet-500 ${iconStyle}`}>
							{' '}
							<BiSolidBell />
						</span>
					),
					description: 'Off',
					suffix: (
						<MyTooltip title='Check your Window settings to enable Messenger notifications'>
							<span className='text-sm text-neutral-500'>
								<IoWarning />
							</span>
						</MyTooltip>
					),
					onClick: undefined,
				},
				{
					title: 'Appearance',
					icon: (
						<span className={`bg-black ${iconStyle}`}>
							{' '}
							<BsFillMoonFill />
						</span>
					),
					description: 'Light',
					suffix: undefined,
					onClick: undefined,
				},
				{
					title: 'Language',
					icon: (
						<span className={`bg-blue-500 ${iconStyle}`}>
							{' '}
							<GiEarthAsiaOceania />
						</span>
					),
					description: 'System language',
					suffix: undefined,
					onClick: undefined,
				},
			],
		},
		{
			section: 'Calls',
			items: [],
		},
		{
			section: 'End-to-end Encryption',
			items: [
				{
					title: 'Logins',
					icon: (
						<span className={`bg-black ${iconStyle}`}>
							{' '}
							<ImKey />
						</span>
					),
					description: undefined,
					suffix: undefined,
					onClick: undefined,
				},
				{
					title: 'Security alerts',
					icon: (
						<span className={`bg-black ${iconStyle}`}>
							{' '}
							<BiSolidShield />
						</span>
					),
					description: undefined,
					suffix: undefined,
					onClick: undefined,
				},
			],
		},
		{
			section: 'Account & support',
			items: [
				{
					title: 'Log out',
					icon: (
						<span className={`bg-violet-500 ${iconStyle}`}>
							{' '}
							<span className='translate-x-[2px]'>
								<TbLogout />
							</span>
						</span>
					),
					description: undefined,
					suffix: undefined,
					onClick: () => {
						setOpenLogoutModal(true);
					},
				},
				{
					title: 'Account settings',
					icon: (
						<span className={`bg-blue-500 ${iconStyle}`}>
							{' '}
							<BsFillGearFill />
						</span>
					),
					description: undefined,
					onClick: undefined,
					suffix: (
						<span className='text-xl text-neutral-500'>
							<HiMiniArrowTopRightOnSquare />
						</span>
					),
				},
				{
					title: 'Report a problem',
					icon: (
						<span className={`bg-orange-500 ${iconStyle}`}>
							{' '}
							<IoWarning />
						</span>
					),
					description: undefined,
					suffix: undefined,
					onClick: undefined,
				},
				{
					title: 'Help',
					icon: (
						<span className={`bg-sky-400 ${iconStyle}`}>
							{' '}
							<BsFillQuestionCircleFill />
						</span>
					),
					description: undefined,
					suffix: (
						<span className='text-xl text-neutral-500'>
							<HiMiniArrowTopRightOnSquare />
						</span>
					),
					onClick: undefined,
				},
				{
					title: 'Legal & policies',
					icon: (
						<span className={`bg-neutral-500 ${iconStyle}`}>
							{' '}
							<BsFillFileEarmarkTextFill />
						</span>
					),
					description: undefined,
					suffix: undefined,
					onClick: undefined,
				},
			],
		},
	];

	const settingDisplayItem = [
		{
			title: 'General',
			render: (
				<>
					<div className='list-item-separated'>
						<h2 className={`${theme.textNormal} font-semibold`}>
							Join beta testing
						</h2>
						<Switch className='switch bg-neutral-400' />
						<p className={`${theme.textFade} text-sm`}>
							Join beta testing to try new features before they're
							released to everyone.
						</p>
					</div>
					<div className='list-item-separated'>
						<h2 className={`${theme.textNormal} font-semibold`}>
							Show Messenger Desktop app in the Windows System
							Tray
						</h2>
						<Switch className='switch bg-neutral-400' />
					</div>
					<div className='list-item-separated'>
						<h2 className={`${theme.textNormal} font-semibold`}>
							Open the Messenger Desktop app when you start your
							computer
						</h2>
						<Switch className='switch bg-neutral-400' />
					</div>
					<div className='list-item-separated'>
						<h2 className={`${theme.textNormal} font-semibold`}>
							Open the Messenger Desktop app when you use
							Messenger in your browser
						</h2>
						<Switch className='switch bg-neutral-400' />
						<p className={`${theme.textFade} text-sm`}>
							The Messenger Desktop app will open automatically
							when you use Messenger on messenger.com.
						</p>
					</div>
				</>
			),
		},
		{
			title: 'Active Status',
			render: (
				<>
					<div className='list-item-separated'>
						<h2 className={`${theme.textNormal} font-semibold`}>
							Show active status
						</h2>
						<Switch
							className='switch bg-neutral-400'
							checked={activeStatus}
							onChange={(checked) => setActiveStatus(checked)}
						/>
						<p className={`${theme.textNormal} font-bold `}>
							Active status: {activeStatus ? 'On' : 'Off'}
						</p>
					</div>
					<div className='flex flex-col gap-2 pt-4'>
						<p className={`${theme.textFade} text-sm`}>
							You friends and contacts will see when you're active
							or recently active. You'll appear active or recently
							active unless you turn off the setting every place
							you're using Messenger or Facebook. You'll also see
							when you friends and contacts are active or recently
							active.
						</p>
						<a className='font-semibold text-blue-600 underline'>
							Learn more
						</a>
					</div>
				</>
			),
		},
		{
			title: 'Notifications',
			render: (
				<>
					<div className='list-item-separated'>
						<div className='p-3 border rounded-md border-neutral-300'>
							<div className='flex items-start justify-center gap-2'>
								<span className='text-3xl'>
									<IoWarning />
								</span>
								<div
									className={`${theme.textNormal} flex flex-col gap-2 leading-none mb-4`}
								>
									<span className='font-bold'>
										Notifications are turned off
									</span>
									<span>
										You can enable Messenger notifications
										in your Windows Settings
									</span>
								</div>
							</div>
							<MyTooltip title='Open Window Settings'>
								<Button
									className={`bg-neutral-100 ${theme.textNormal} font-bold `}
									type='text'
									block
								>
									Open Windows Settings
								</Button>
							</MyTooltip>
						</div>
						<h2 className='mt-8 font-semibold'>
							Mute all notifications
						</h2>
						<Switch className='switch bg-neutral-300' />
					</div>
					<div className='list-item-separated'>
						<h2 className='mt-2 font-semibold'>Show previews</h2>
						<Switch className='switch bg-neutral-300' />
						<p className={`${theme.textFade} text-sm`}>
							Show message previews when you're not using the app.
						</p>
					</div>
				</>
			),
		},
		{
			title: 'Appearance',
			render: (
				<>
					<div className='flex flex-col gap-4 list-item-separated'>
						<h2 className='font-semibold'>Show previews</h2>
						<Select
							defaultValue='Light'
							options={[
								{ value: 'Light', label: 'Light' },
								{ value: 'Grey', label: 'Grey' },
								{ value: 'Dark', label: 'Dark' },
							]}
						/>
					</div>
					<div className='flex flex-col gap-4 list-item-separated'>
						<h2 className='font-semibold'>Emoji Skintone</h2>
						<ul className='flex items-center gap-2'>
							<li>
								<Button
									type='text'
									size='large'
									className='flex items-center justify-center text-xl'
								>
									👍
								</Button>
							</li>
						</ul>
					</div>
					<div className='flex flex-col gap-4 list-item-separated'>
						<h2 className='font-semibold'>Zoom level</h2>
						<Select
							defaultValue='100'
							options={[
								{ value: '80', label: 'Small (80%)' },
								{ value: '100', label: 'Normal (100%)' },
								{ value: '115', label: 'Large (115%)' },
							]}
						/>
						<p className={`${theme.textFade} text-sm`}>
							Make thing in Messenger look larger or smaller.
						</p>
					</div>
				</>
			),
		},
		{
			title: 'Language',
			render: (
				<>
					<div className='flex flex-col gap-4 list-item-separated'>
						<Select
							defaultValue='US'
							options={[{ value: 'US', label: 'English (US)' }]}
						/>
						<p className={`${theme.textFade} text-sm`}>
							Change the language Messenger is displayed in. You
							must restart the application for the changes to take
							effect
						</p>
					</div>
					<div className='list-item-separated'>
						<h2 className='mt-2 font-semibold'>
							Text input spell-checking and auto-correction
						</h2>
						<Switch className='switch bg-neutral-300' />
					</div>
				</>
			),
		},
	];

	const draggleRef = useRef<HTMLDivElement>(null);
	const [disabled, setDisabled] = useState(false);
	const [chosenMenuItem, setChosenMenuItem] = useState('General');

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

	const handleDrag = (e: DraggableEvent) => {
		e.preventDefault();
		e.stopPropagation();
    }

	return (
		open && (
			<Draggable
				disabled={disabled}
				defaultPosition={{ x: 370, y: 40 }}
				nodeRef={draggleRef}
				bounds={bounds}
				onDrag={handleDrag}
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
							className={`flex w-full h-full border border-black border-opacity-50 shadow-2xl scroll-smooth ${theme.popupBgColor}`}
						>
							<div className='flex-shrink-0 h-full border-r w-[312px] border-neutral-400 border-opacity-40 overflow-y-auto'>
								{settingMenuItems.map((section, index) => {
									return (
										<div key={index}>
											<h5 className='p-2 pl-4 text-sm font-normal text-neutral-500'>
												{section.section}
											</h5>
											{section.items.map((item) => (
												<MenuItemHeader
													key={item.title}
													title={item.title}
													icon={item.icon}
													description={
														item.description
													}
													suffix={item.suffix}
													onClick={() => {
														if (item.onClick) {
															item.onClick();
														} else {
															setChosenMenuItem(
																item.title
															);
														}
													}}
													active={
														item.title ===
														chosenMenuItem
													}
												/>
											))}
										</div>
									);
								})}
							</div>
							<div className='flex flex-col flex-1 px-8 overflow-x-hidden overflow-y-auto pt-14'>
								{settingDisplayItem.map((item, index) =>
									item.title === chosenMenuItem ? (
										<section key={index}>
											<h1
												className={`${theme.textNormal} font-bold text-xl py-1`}
											>
												{item.title}
											</h1>
											{item.render}
										</section>
									) : (
										''
									)
								)}
							</div>
						</section>

						<SignOutPopup
							open={openLogout}
							setOpenModal={setOpenLogoutModal}
						/>
					</Resizable>
				</div>
			</Draggable>
		)
	);
};

export default SettingModal;
