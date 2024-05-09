import { useEffect, useState } from 'react';

interface IDebounce {
	searchQuery: string;
	delay: number;
}

export const useDebounce = ({ searchQuery, delay }: IDebounce) => {
	// State and setters for debounced searchQuery
	const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

	useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(searchQuery);
			}, delay);

			return () => {
				clearTimeout(handler);
			};
		},
		[searchQuery, delay] // Only re-call effect if value or delay changes
	);

	return debouncedValue;
};
