import LinesEllipsis from 'react-lines-ellipsis';
import React, { useRef, useState, useEffect } from 'react';
import { BiSolidVideoPlus } from 'react-icons/bi';
import UserAvatar from './UserAvatar';
import clsx from 'clsx';
import { Tooltip } from 'antd';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// type UserCarouselPropsType = {
//     users: string,
// }

const buttonStyle =
	'bg-neutral-300 bg-opacity-20 hover:bg-opacity-60 rounded-full p-1 text-black aspect-square absolute z-10 translate-y-1/2';

const UserCarousel: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);

	const loop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [leftButtonDisabled, setLeftButtonDisabled] = useState(true);
	const [rightButtonDisabled, setRightButtonDisabled] = useState(false);
	const distance = 72;

	useEffect(() => {
		const scrollDiv = ref.current;

		if (scrollDiv !== null) {
			scrollDiv.addEventListener('wheel', (event) => {
				event.preventDefault();
				if (event.deltaY > 0) {
					scrollDiv.scrollBy({left: 50 , behavior: 'smooth'})
					
				} else {
					scrollDiv.scrollBy({left: -50, behavior: 'smooth'})
				}
				if (scrollDiv.scrollLeft === 0) {
					setLeftButtonDisabled(true);
				} else {
					setLeftButtonDisabled(false);
				}
				if (scrollDiv.scrollLeft > 377) {
					setRightButtonDisabled(true);
				} else {
					setRightButtonDisabled(false);
				}
			});
		}

		return () => {
			scrollDiv?.removeEventListener('wheel', (event) => {
				event.preventDefault();
				if (event.deltaY > 0) {
					scrollDiv.scrollBy({left: 50 , behavior: 'smooth'})
					
				} else {
					scrollDiv.scrollBy({left: -50, behavior: 'smooth'})
				}
				if (scrollDiv.scrollLeft === 0) {
					setLeftButtonDisabled(true);
				} else {
					setLeftButtonDisabled(false);
				}
				if (scrollDiv.scrollLeft > 377) {
					setRightButtonDisabled(true);
				} else {
					setRightButtonDisabled(false);
				}
			});
		};
	}, []);

	const handleHorizantalScroll = (
		element: HTMLDivElement | null,
		speed: number,
		step: number
	) => {
		let scrollAmount = 0;
		if (element) {
			const slideTimer = setInterval(() => {
				element.scrollLeft += step;
				scrollAmount += Math.abs(step);
				if (scrollAmount >= distance) {
					clearInterval(slideTimer);
				}
				if (element.scrollLeft === 0) {
					setLeftButtonDisabled(true);
				} else {
					setLeftButtonDisabled(false);
				}
				if (element.scrollLeft > 377) {
					setRightButtonDisabled(true);
				} else {
					setRightButtonDisabled(false);
				}
			}, speed);
		}
	};

	return (
		<div className='relative ml-4 '>
			{ref && (
				<>
					<button
						disabled={leftButtonDisabled}
						onClick={() =>
							handleHorizantalScroll(ref.current, 12, -6)
						}
						className={clsx(
							`left-3 ${buttonStyle}`,
							leftButtonDisabled && 'hidden'
						)}
					>
						<IoIosArrowBack />
					</button>
					<button
						disabled={rightButtonDisabled}
						onClick={() =>
							handleHorizantalScroll(ref.current, 12, 6)
						}
						className={clsx(
							`right-2 ${buttonStyle}`,
							rightButtonDisabled && 'hidden'
						)}
					>
						<IoIosArrowForward />
					</button>
				</>
			)}
			<div
				id='priority'
				ref={ref}
				className='relative flex items-start gap-6 overflow-x-auto overflow-y-hidden'
			>
				<Tooltip
					title='Start call'
					arrow={false}
					mouseEnterDelay={0.6}
					mouseLeaveDelay={0}
				>
					<div className='flex flex-col gap-2 select-none aspect-square'>
						<span className='flex items-center justify-center h-full w-[48px] bg-neutral-300 text-2xl bg-opacity-50 rounded-full'>
							<BiSolidVideoPlus />
						</span>
						<span className='flex text-xs text-center'>
							Start call
						</span>
					</div>
				</Tooltip>

				{loop.map((index) => (
					<div
						key={index}
						className='max-w-[48px] w-[48px] flex flex-col gap-2 text-xs text-center select-none'
					>
						<UserAvatar tooltip="User's Name longgggggggg" online />{' '}
						<LinesEllipsis
							text="User's Name longgggggggg"
							maxLine='2'
							ellipsis='...'
							trimRight
							basedOn='letters'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserCarousel;
