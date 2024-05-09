/* eslint-disable @typescript-eslint/no-unused-vars */
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { instance as axiosInstane } from './axiosInstance';
import { IMeta } from '@/types';

export const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: '' }
	): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			meta?: IMeta;
			params?: AxiosRequestConfig['params'];
			contentType?: string;
		},
		unknown,
		unknown
	> =>
		async ({ url, method, data, params, contentType }) => {
			try {
				const result = await axiosInstane({
					url: baseUrl + url,
					method,
					data,
					params,
					headers: {
						'Content-Type': contentType || 'application/json',
						Accept: 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
					withCredentials: true
				});
				return result;
			} catch (axiosError) {
				let err = axiosError as AxiosError;
				return {
					error: {
						status: err.response?.status,
						data: err.response?.data || err.message,
					},
				};
			}
		};
