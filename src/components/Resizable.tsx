import React, { ReactNode, useEffect, useRef } from 'react';

type ResizablePropsType = {
	bottom?: boolean;
	children: ReactNode;
	maxWidth: number;
	minWidth: number;
	maxHeight?: number;
	minHeight?: number;
};

const Resizable: React.FC<ResizablePropsType> = ({
	children,
	bottom,
	maxWidth,
	maxHeight,
	minWidth,
	minHeight,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const refRight = useRef<HTMLDivElement>(null);
	const refBottom = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current != null && refRight.current != null) {
			const resizableElement = ref.current;
			const style = window.getComputedStyle(resizableElement);
			resizableElement.style.width = `${
				minWidth + (maxWidth - minWidth) / 2
			}px`;

			let width = parseInt(style.width, 10);
			let height = parseInt(style.height, 10);
			let x = 0;
			let y = 0;

			if (minHeight !== undefined && maxHeight !== undefined) {
				resizableElement.style.height = `${
					minHeight + (maxHeight - minHeight) / 2
				}px`;
			}

			const onMouseDownRight = (e: MouseEvent) => {
				x = e.clientX;

				document.addEventListener('mousemove', onMouseMoveRight);
				document.addEventListener('mouseup', onMouseUpRight);
			};

			const onMouseMoveRight = (e: MouseEvent) => {
				const dx = e.clientX - x;
				x = e.clientX;
				width = width + dx;
				if (width >= maxWidth) {
					width = maxWidth;
				}
				if (width <= minWidth) {
					width = minWidth;
				}
				resizableElement.style.width = `${width}px`;
			};

			const onMouseUpRight = () => {
				document.removeEventListener('mousemove', onMouseMoveRight);
				document.removeEventListener('mouseup', onMouseUpRight);
			};

			const resizer = refRight.current;
			resizer.addEventListener('mousedown', onMouseDownRight);

			if (
				refBottom.current !== null &&
				minHeight !== undefined &&
				maxHeight !== undefined
			) {
				const onMouseDownBottom = (e: MouseEvent) => {
					y = e.clientY;

					document.addEventListener('mousemove', onMouseMoveBottom);
					document.addEventListener('mouseup', onMouseUpBottom);
				};

				const onMouseMoveBottom = (e: MouseEvent) => {
					const dy = e.clientY - y;
					y = e.clientY;
					height = height + dy;
					if (height >= maxHeight) {
						height = maxHeight;
					}
					if (height <= minHeight) {
						height = minHeight;
					}
					resizableElement.style.height = `${height}px`;
				};

				const resizerB = refBottom.current;
				resizerB.addEventListener('mousedown', onMouseDownBottom);

				const onMouseUpBottom = () => {
					document.removeEventListener(
						'mousemove',
						onMouseMoveBottom
					);
					document.removeEventListener('mouseup', onMouseUpBottom);
				};
			}

			return () => {
				resizer.removeEventListener('mousedown', onMouseDownRight);
			};
		}
	}, []);

	return (
		<div
			ref={ref}
			className={`max-w-[${maxWidth}] min-w-[${minWidth}] max-h-[${maxHeight}] min-h-[${minHeight}] flex flex-col flex-1 relative bg-white resize`}
		>
			{children}
			<div ref={refRight} className='resizer-r'></div>
			{bottom && <div ref={refBottom} className='resizer-b'></div>}
		</div>
	);
};

export default Resizable;
