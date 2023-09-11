import React, { useEffect, useRef } from 'react';

const ChatOption: React.FC = () => {
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
                if(width >= 512){
                    width = 512
                }
                if(width <= 200){
                    width = 200
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
			<div ref={ref} className='md:max-w-lg md:min-w-[200px] overflow-auto'>
				ChatOption
				<div ref={refRight} className='resizer-r'></div>
			</div>
		</>
	);
};

export default ChatOption;
