import React, { useEffect, useRef, useState } from 'react';
import IconButton from '../../IconButton';
import { BiSolidSquare } from 'react-icons/bi';
import { BsFillPlayFill, BsFillVolumeDownFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import useThrottle from '../../../hooks/useThrottle';
import './video-player.css';
import { Tooltip } from 'flowbite-react';

type props = {
	src: string;
};

const VideoPlayer: React.FC<props> = ({ src }) => {
	// state
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(0.1);
	const [lastVolume, setLastVolume] = useState(0);
	const [duration, setDuration] = useState(0);
	const [remainingTime, setRemainingTime] = useState(0);

	// ref
	const videoPlayer = useRef<HTMLVideoElement | null>(null);
	const progressBar = useRef<HTMLInputElement | null>(null);
	const volumeBar = useRef<HTMLInputElement | null>(null);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		const videoEl = videoPlayer.current;

		if (!videoEl) return;

		const handleMetadataLoad = () => {
			setDuration(videoEl.duration);
			setRemainingTime(videoEl.duration);
			videoEl.volume = volume;
		};

		videoEl.addEventListener('loadedmetadata', handleMetadataLoad);

		// Cleanup the event listener on component unmount
		return () => {
			videoEl.removeEventListener('loadedmetadata', handleMetadataLoad);
		};
	}, [videoPlayer.current?.readyState]);

	// func

	const togglePlayPause = useThrottle(() => {
		const prevValue = isPlaying;
		setIsPlaying(!prevValue);

		if (!prevValue) {
			videoPlayer.current?.play();
			animationRef.current = requestAnimationFrame(whilePlaying);
		} else {
			videoPlayer.current?.pause();
			cancelAnimationFrame(animationRef.current!);
		}
	}, 150);

	const changeVolume = (volume: number) => {
		setVolume(volume);
		if (volumeBar && volumeBar.current) {
			volumeBar.current.style.setProperty(
				'--seek-before-width',
				`${volume * 100}%`
			);
		}
		if (videoPlayer.current) {
			videoPlayer.current.volume = volume;
		}
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const volume = parseFloat(e.target.value);
		changeVolume(volume);
	};

	const toggleMuteVolume = () => {

			changeVolume(lastVolume)
			setLastVolume(volume)
		
	}

	const whilePlaying = () => {
		if (
			videoPlayer &&
			videoPlayer.current &&
			progressBar &&
			progressBar.current
		) {
			if (
				videoPlayer.current.currentTime < videoPlayer.current.duration
			) {
				const percentValue =
					videoPlayer.current.currentTime /
					videoPlayer.current.duration;
				progressBar.current.value = (
					percentValue * parseInt(progressBar.current.max)
				).toString();
				changeProgess(percentValue);
				animationRef.current = requestAnimationFrame(whilePlaying);
			} else {
				setIsPlaying(false);
				progressBar.current.value = '0';
				changeProgess(0);
			}
		}
	};

	const changeRange = () => {
		if (
			videoPlayer &&
			videoPlayer.current &&
			progressBar &&
			progressBar.current
		) {
			const percentValue =
				parseInt(progressBar.current.value) /
				parseInt(progressBar.current.max);
			videoPlayer.current.currentTime = Math.floor(
				percentValue * duration
			);
			changeProgess(percentValue);
		}
	};

	const changeProgess = (value: number) => {
		if (progressBar && progressBar.current) {
			progressBar.current.style.setProperty(
				'--video-seek-before-width',
				`${value * 100}%`
			);
			setRemainingTime((1 - value) * duration);
		}
	};

	const calculateTime = (secs: number) => {
		const minutes = Math.floor(secs / 60);
		const returnedMinutes = `${minutes}`;
		let seconds = Math.floor(secs % 60);
		if (seconds < 1 && seconds > 0.1) {
			seconds = 1;
		}
		if (seconds < 0.1) {
			seconds = 0;
		}
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${returnedMinutes}:${returnedSeconds}`;
	};

	return (
		<div className='relative flex items-center justify-center function-container'>
			<video
				ref={videoPlayer}
				src={src}
				className='w-full h-full '
				preload='metadata'
				onClick={togglePlayPause}
			/>
			{!isPlaying && videoPlayer.current?.currentTime === 0 && (
				<div
					className='absolute text-5xl text-white '
					onClick={togglePlayPause}
				>
					<BsFillPlayFill />
				</div>
			)}

			{/* function bar */}
			<div className='absolute z-10 w-full px-6 transition-opacity bottom-4 function-bar'>
				<div className='relative z-10 flex items-center justify-center gap-3 p-1'>
					{/* play button */}
					<div className='absolute -z-[1] w-full h-full bg-neutral-900 opacity-30 left-0 top-0'/>

					<IconButton
						tooltipTitle='Play Video'
						onClick={togglePlayPause}
					>
						{isPlaying ? (
							<span className='flex items-center justify-center w-6 text-xs aspect-square'>
								<BiSolidSquare />
							</span>
						) : (
							<span className='flex items-center justify-center w-6 aspect-square'>
								<BsFillPlayFill />
							</span>
						)}
					</IconButton>

					{/* duration */}

					<div className='w-10 font-medium'>
						{remainingTime &&
							!isNaN(remainingTime) &&
							calculateTime(remainingTime)}
					</div>

					{/* progress bar */}

					<input
						ref={progressBar}
						className='flex-grow py-[6px] videoProgressBar'
						type='range'
						defaultValue='0'
						min='0'
						max='1000'
						onChange={changeRange}
					/>

					{/* volume button */}

					<Tooltip
						className='p-0 -rotate-90 translate-x-[5px] -translate-y-9 bg-transparent'
						arrow={false}
						content={
							<div className=''>
								<input
									ref={volumeBar}
									className='w-20 bg-transparent volume-range'
									type='range'
									value={volume}
									min='0'
									max='1'
									step='0.01'
									onChange={handleVolumeChange}
								/>
							</div>
						}
					>
						<div
							onClick={toggleMuteVolume}
							className='relative flex items-center justify-center w-6 text-2xl text-white aspect-square'
						>
							{
								volume === 0 ? <BsFillVolumeMuteFill/> : <BsFillVolumeDownFill />
							}
							
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	);
};

export default VideoPlayer;
