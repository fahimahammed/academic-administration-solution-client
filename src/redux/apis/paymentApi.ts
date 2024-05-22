import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_STUDENT_SEMETER_PAYMENT } from '@/constants/api';
import baseApi from './baseApi';
import { IRoom } from '@/types/room';

const paymentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		myPayments: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_STUDENT_SEMETER_PAYMENT}/my-semester-payments`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IRoom[], meta: IMeta) => {
				return {
					myPayments: response,
					meta,
				};
			},
			providesTags: [tagTypes.payment],
		}),
		allPayments: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_STUDENT_SEMETER_PAYMENT}/`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IRoom[], meta: IMeta) => {
				return {
					payments: response,
					meta,
				};
			},
			providesTags: [tagTypes.payment],
		}),
		payment: build.query({
			query: (id: string) => ({
				url: `${BASE_STUDENT_SEMETER_PAYMENT}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.course],
		}),
		initialPayment: build.mutation({
			query: data => ({
				url: `${BASE_STUDENT_SEMETER_PAYMENT}/initiate-payment`,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.payment],
		}),
		completePayment: build.query({
			query: (transactionId: string) => ({
				url: `${BASE_STUDENT_SEMETER_PAYMENT}/complete-payment`,
				method: 'GET',
				params: { transactionId },
			}),
			providesTags: [tagTypes.payment],
		}),
	}),
});

export const { useMyPaymentsQuery, useAllPaymentsQuery, usePaymentQuery, useInitialPaymentMutation, useCompletePaymentQuery } = paymentApi;

export default paymentApi;
