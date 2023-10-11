import { useEffect, useRef, useState } from 'react';
import { BiSolidSquare } from 'react-icons/bi';
import { BsFillPlayFill } from 'react-icons/bs';
import './audio-player.css';
import useThrottle from '../../../hooks/useThrottle';
import { useAppSelector } from '../../../hooks/useAppRedux';

type Props = {
	src: string;
};

const AudioPlayer = (props: Props) => {
	const { src } = props;
	const customTheme = useAppSelector((state) => state.customTheme);

	//state
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [remainingTime, setRemainingTime] = useState(0);
	// ref
	const audioPlayer = useRef<HTMLAudioElement | null>(null);
	const progressBar = useRef<HTMLInputElement | null>(null);
	const animationRef = useRef<number | null>(null);

	useEffect(() => {
		const audioEl = audioPlayer.current;

		if (!audioEl) return;

		const handleMetadataLoad = () => {
			setDuration(audioEl.duration);
			setRemainingTime(audioEl.duration);
		};

		audioEl.addEventListener('loadedmetadata', handleMetadataLoad);

		// Cleanup the event listener on component unmount
		return () => {
			audioEl.removeEventListener('loadedmetadata', handleMetadataLoad);
		};
	}, [audioPlayer.current?.readyState]);

	//   func
	const togglePlayPause = useThrottle(() => {
		const prevValue = isPlaying;
		setIsPlaying(!prevValue);

		if (!prevValue) {
			audioPlayer.current?.play();
			animationRef.current = requestAnimationFrame(whilePlaying);
		} else {
			audioPlayer.current?.pause();
			cancelAnimationFrame(animationRef.current!);
		}
	}, 150);

	const whilePlaying = () => {
		if (
			audioPlayer &&
			audioPlayer.current &&
			progressBar &&
			progressBar.current
		) {
			if (
				audioPlayer.current.currentTime < audioPlayer.current.duration
			) {
				const percentValue =
					audioPlayer.current.currentTime /
					audioPlayer.current.duration;
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

	const handleChange = () => {
		if (
			audioPlayer &&
			audioPlayer.current &&
			progressBar &&
			progressBar.current
		) {
			const percentValue =
				parseInt(progressBar.current.value) /
				parseInt(progressBar.current.max);
			audioPlayer.current.currentTime = percentValue * duration;
			changeProgess(percentValue);
			console.log('check input  ', audioPlayer.current.currentTime);
		}
	};

	const changeProgess = (value: number) => {
		if (progressBar && progressBar.current) {
			progressBar.current.style.setProperty(
				'--seek-before-width',
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
		<>
			<audio ref={audioPlayer} src={src} preload='metadata'></audio>
			<button
				onClick={togglePlayPause}
				className='z-10 overflow-hidden rounded-full aspect-square text-default-blue'
			>
				{isPlaying ? (
					<span className='flex items-center justify-center w-6 text-xs bg-white hover:bg-neutral-200 aspect-square'>
						<BiSolidSquare />
					</span>
				) : (
					<span className='flex items-center justify-center w-6 bg-white hover:bg-neutral-200 aspect-square'>
						<BsFillPlayFill />
					</span>
				)}
			</button>

			{/* progress bar */}

			<input
				className={`progressBar ${customTheme.bgMessage} absolute top-0 left-0 w-full h-full`}
				type='range'
				defaultValue='0'
				min='0'
				max='1000'
				ref={progressBar}
				onChange={handleChange}
			/>

			{/* remaining time */}
			<div className='z-10 px-2 text-sm font-medium bg-white text-default-blue rounded-3xl '>
				{remainingTime &&
					!isNaN(remainingTime) &&
					calculateTime(remainingTime)}
			</div>
		</>
	);
};

export default AudioPlayer;
