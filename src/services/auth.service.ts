import { authKey } from '@/constants';
import { decodeToken } from '@/utils/jwt';
import { getFromLocalStorage, setFromLocalStorage } from '@/utils/local-storage';

export function storeUserInfo({ accessToken }: { accessToken: string }) {
	setFromLocalStorage(authKey, accessToken as string);
}

export function getUserInfo() {
	const authLocalStorageData = getFromLocalStorage(authKey);
	if (authLocalStorageData) {
		const data = decodeToken(authLocalStorageData);
		return data;
	} else {
		return null;
	}
}

export function isLoggedIn() {
	const authLocalStorage = getFromLocalStorage(authKey);
	return !!authLocalStorage;
}
