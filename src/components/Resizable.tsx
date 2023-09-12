import React, { ReactNode, useEffect, useRef } from 'react';

const Resizable: React.FC<{children: ReactNode}> = ({children}) => {
	const ref = useRef<HTMLDivElement>(null);
	const refRight = useRef<HTMLDivElement>(null);

	useEffect(() => {
        if (ref.current != null && refRight.current != null){
            const resizableElement = ref.current;
            const style = window.getComputedStyle(resizableElement)
            let width = parseInt(style.width, 10)
            let x = 0;

            const onMouseDown = (e: MouseEvent) => {
                x = e.clientX;

                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            }

            const onMouseMove = (e: MouseEvent) => {
                const dx = e.clientX - x;
                x = e.clientX;
                width = width + dx;
                if(width >= 500){
                    width = 500
                }
                if(width <= 270){
                    width = 270
                }
                resizableElement.style.width = `${width}px`
            }

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            const resizer = refRight.current
            resizer.addEventListener('mousedown', onMouseDown);

            

            return () => {
                resizer.removeEventListener('mousedown', onMouseDown);
            }
        }
        
        
    }, []);

	return (
		<>
			<div ref={ref} className='md:max-w-[500px] md:min-w-[270px] flex flex-col relative h-full bg-white border-gray-500 border-opacity-40 border-r-[1px]'>
				{children}
                <div ref={refRight} className='resizer-r'></div>
			</div>
		</>
	);
};

export default Resizable;
