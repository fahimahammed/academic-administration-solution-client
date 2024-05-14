/*eslint-disable*/
import { authKey } from '@/constants';
import { getNewAccessToken } from '@/services';
import { ResponseErrorType, ResponseSccessType } from '@/types';
import { getFromLocalStorage, setFromLocalStorage } from '@/utils/local-storage';
import axios from 'axios';

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

// Add a response interceptor

instance.interceptors.response.use(
	//@ts-ignore
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		const responseObject: ResponseSccessType = {
			data: response?.data?.data,
			meta: response?.data?.meta,
		};
		return responseObject;
	},
	async function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		// console.log(error);
		const config = error.config;
		//console.log("Config:  :  : ========== >>>>>> ", config);
		if (error?.response?.status === 401 && !config.sent) {
			config.sent = true;
			const response = await getNewAccessToken();
			const accessToken = response?.data?.accessToken;
			config.headers["Authorization"] = accessToken;
			setFromLocalStorage(authKey, accessToken);
			//console.log(config)
			return instance(config);
		} else {
			const responseObject: ResponseErrorType = {
				statusCode: error?.response?.data?.statusCode || 500,
				message: error?.response?.data?.message || "Something went wrong!!!",
				errorMessages: error?.response?.data?.message,
			};
			return Promise.reject(responseObject);
			// return responseObject;
		}
	}
);

// instance.interceptors.response.use(
// 	// @ts-ignore
// 	function (response) {
// 		const responseObject: ResponseSccessType = {
// 			data: response?.data?.data,
// 			meta: response?.data?.meta,
// 		};
// 		return responseObject;
// 	},
// 	function (error) {
// 		const responseObject: ResponseErrorType = {
// 			statusCode: error?.response?.data?.statusCode || 500,
// 			message: error?.response?.data?.message || 'Something Went Wrong',
// 			errorMessages: error?.response?.data?.message,
// 		};
// 		return Promise.reject(responseObject);
// 	}
// );

export { instance };
