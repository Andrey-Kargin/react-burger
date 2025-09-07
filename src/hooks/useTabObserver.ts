import {
	useEffect,
	useRef,
	type RefObject,
	type MutableRefObject,
} from 'react';

export function useTabObserver<
	TTab extends string,
	TEl extends HTMLElement = HTMLDivElement
>(
	categoryRefs: MutableRefObject<Record<TTab, RefObject<TEl>>>,
	setCurrent: (key: TTab) => void
) {
	const isManualScroll = useRef(false);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		const entriesArray = Object.entries(categoryRefs.current) as Array<
			[TTab, RefObject<TEl>]
		>;

		const observer = new IntersectionObserver(
			(entries) => {
				if (isManualScroll.current) return;

				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible.length > 0) {
					const firstTarget = visible[0].target as TEl;
					const targetKey = entriesArray.find(
						([, ref]) => ref.current === firstTarget
					)?.[0];
					if (targetKey) setCurrent(targetKey);
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
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
			timeoutRef.current = window.setTimeout(() => {
				isManualScroll.current = false;
			}, 500);
		},
	};
}
