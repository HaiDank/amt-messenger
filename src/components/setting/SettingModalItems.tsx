import { BiSolidBell, BiSolidShield } from 'react-icons/bi';
import { BsFillFileEarmarkTextFill, BsFillGearFill, BsFillMoonFill, BsFillQuestionCircleFill } from 'react-icons/bs';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import { IoWarning } from 'react-icons/io5';
import { GiEarthAsiaOceania } from 'react-icons/gi';
import {ImKey} from 'react-icons/im'
import { TbLogout } from 'react-icons/tb';
import { Switch } from 'antd';

const iconStyle = 'relative text-white w-8 text-center text-lg rounded-full aspect-square flex items-center justify-around'



export const settingMenuItems = [
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
					<span className='text-sm text-neutral-500'>
						<IoWarning />
					</span>
				),
			},
			{
				title: 'Apperence',
				icon: (
					<span className={`bg-black ${iconStyle}`}>
						{' '}
						<BsFillMoonFill />
					</span>
				),
				description: 'Light',
				suffix: undefined,
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
			},
		],
	},
];


export const settingDisplayItem = [
	{
		title: 'General',
		render: (
			<>
			<h1>General</h1>
				<div className='list-item-separated'>
					<h2>Join beta testing</h2>
					<Switch/>
					<p className=''>Join beta testing to try new features before they're released to everyone.</p>
				</div>
				<div className='list-item-separated'>
					<h2>Join beta testing</h2>
					<Switch/>
					<p className=''>Join beta testing to try new features before they're released to everyone.</p>
				</div>
				<div className='list-item-separated'>
					<h2>Join beta testing</h2>
					<Switch/>
					<p className=''>Join beta testing to try new features before they're released to everyone.</p>
				</div>
			</>
		)
	},
	{
		title: 'Active Status',
		render: (
			<>
			<h1>General</h1>
				<div className='list-item-separated'>
					<h2>Join beta testing</h2>
					<Switch/>
					<p className=''>Join beta testing to try new features before they're released to everyone.</p>
				</div>
			</>
		)
	},
	{
		title: 'Notifications',
		render: (
			<>
			<h1>General</h1>
				<div className='list-item-separated'>
					<h2>Join beta testing</h2>
					<Switch/>
					<p className=''>Join beta testing to try new features before they're released to everyone.</p>
				</div>
			</>
		)
	},

]