import { useState } from "react";

const useThrottle = (callback: () => void, delay: number) => {
	const [shouldWait,setShouldWait]=useState(false);

	return function () {
		if (shouldWait) return;

		callback();
		setShouldWait(true)

		setTimeout(() => {
			setShouldWait(false)
		}, delay);
	};
};

export default useThrottle;
