import React, { useEffect, useState } from 'react';
import MyTooltip from '../../MyTooltip';
import IconButton from '../../IconButton';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaClapperboard, FaMicrophone } from 'react-icons/fa6';

type props = {
	file: File;
	previewUrl: string;
	onClose: () => void;
};

const FilePreview: React.FC<props> = ({ file, previewUrl, onClose }) => {
	const [fileType, setFileType] = useState<string>('');
	const [fileSubType, setFileSubType] = useState<string>('');

	useEffect(() => {
		if (file) {
			const split = file.type.split('/');
			const type = split[0]; // Extract the primary type
			let subType = split[1];
            if(subType === 'mpeg'){
                subType = 'mp3'
            }
			setFileType(type);
			setFileSubType(subType);
		}
	}, []);

	const handleClose = () => {
		if (onClose) {
			onClose();
		}
	};

	return (
		<div className='relative'>
			<MyTooltip title={file.name}>
				{/* image */}
				{fileType === 'image' && (
					<img
						src={previewUrl}
						className='object-cover w-20 select-none rounded-xl aspect-square drag-none'
					/>
				)}

				{/* video */}
				{fileType === 'video' && 
					<div className='flex flex-col items-center justify-center w-20 gap-[2px] select-none rounded-xl aspect-square drag-none bg-neutral-200'>
						<div className='text-2xl font-bold text-neutral-600'>
							<FaClapperboard />
						</div>
                        <p className='font-bold text-neutral-600'>
                            {fileSubType.toLocaleUpperCase()}
                        </p>
					</div>
				}

                {/* audio */}

                {fileType === 'audio' && 
                <div className='flex flex-col items-center justify-center w-20 gap-[2px] select-none rounded-xl aspect-square drag-none bg-neutral-200'>
						<div className='text-2xl font-bold text-neutral-600'>
							<FaMicrophone />
						</div>
                        <p className='font-bold text-neutral-600'>
                            {fileSubType.toLocaleUpperCase()}
                        </p>
					</div>
                }
			</MyTooltip>
			<IconButton
				className='absolute top-0 right-0 text-sm'
				tooltipTitle='Remove Attachment'
				onClick={handleClose}
			>
				<AiFillCloseCircle />
			</IconButton>
		</div>
	);
};

export default FilePreview;
