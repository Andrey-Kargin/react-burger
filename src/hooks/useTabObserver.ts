import { useEffect, useRef, RefObject } from 'react';

type CategoryRefs<T extends HTMLElement = HTMLElement> = {
	current: Record<string, RefObject<T>>;
};

export function useTabObserver<T extends HTMLElement = HTMLElement>(
	categoryRefs: CategoryRefs<T>,
	setCurrent: (key: string) => void
) {
	const isManualScroll = useRef(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		const entriesArray = Object.entries(categoryRefs.current);

		const observer = new IntersectionObserver(
			(entries) => {
				if (isManualScroll.current) return;

				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					const targetKey = entriesArray.find(
						([, ref]) => ref.current === visible[0].target
					)?.[0];
					if (targetKey) {
						setCurrent(targetKey);
					}
				}
			},
			{
				root: null,
				threshold: 0.25,
				rootMargin: '0px 0px -20% 0px',
			}
		);

		entriesArray.forEach(([, ref]) => {
			if (ref.current) observer.observe(ref.current);
		});

		return () => observer.disconnect();
	}, [categoryRefs, setCurrent]);

	return {
		setManualScroll: () => {
			isManualScroll.current = true;
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => {
				isManualScroll.current = false;
			}, 500);
		},
	};
}
