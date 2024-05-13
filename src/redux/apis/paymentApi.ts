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

export const { useMyPaymentsQuery, useInitialPaymentMutation, useCompletePaymentQuery } = paymentApi;

export default paymentApi;
