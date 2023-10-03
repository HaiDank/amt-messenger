import { DependencyList, useCallback, useRef } from 'react';

export default function useIntersectionObserver<T extends HTMLElement>(
	callback: () => void,
	dependencies: DependencyList
) {
	const observer = useRef<IntersectionObserver | null>(null);
	const ref = useCallback(
		(node: T) => {
			if (dependencies.every(Boolean)) {
				let shouldWait = false;
				observer.current?.disconnect(),
					(observer.current = new IntersectionObserver((entries) => {
						if (entries[0].isIntersecting) {
							if (shouldWait) {
								return;
							}

							callback();
							shouldWait = true;
							setTimeout(() => {
								shouldWait = false;
							},500);
						}
					}));
				if (node) {
					observer.current.observe(node);
				}
			}
		},
		[dependencies, callback]
	);

	return ref;
}
