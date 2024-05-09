/*eslint-disable*/
import { authKey } from '@/constants';
import { ResponseErrorType, ResponseSccessType } from '@/types';
import { getFromLocalStorage } from '@/utils/local-storage';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
instance.defaults.timeout = 60000;

instance.interceptors.request.use(
	function (config) {
		const accessToken = getFromLocalStorage(authKey);
		if (accessToken) {
			config.headers.Authorization = accessToken;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	// @ts-ignore
	function (response) {
		const responseObject: ResponseSccessType = {
			data: response?.data?.data,
			meta: response?.data?.meta,
		};
		return responseObject;
	},
	function (error) {
		const responseObject: ResponseErrorType = {
			statusCode: error?.response?.data?.statusCode || 500,
			message: error?.response?.data?.message || 'Something Went Wrong',
			errorMessages: error?.response?.data?.message,
		};
		return Promise.reject(responseObject);
	}
);

export { instance };
