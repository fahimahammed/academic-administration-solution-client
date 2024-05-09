export const getFromLocalStorage = (key: string) => {
	if (!key || typeof window === 'undefined') {
		return '';
	}
	return localStorage.getItem(key);
};

export const setFromLocalStorage = (key: string, data: string) => {
	if (!key || typeof window === 'undefined') {
		return '';
	}
	return localStorage.setItem(key, data);
};

export const removeFromLocalStorage = (key: string) => {
	if (!key || typeof window === 'undefined') {
		return '';
	}
	return localStorage.removeItem(key);
};
