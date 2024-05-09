import { IAdmin, IMeta, QueryParamsType } from '@/types';
import baseApi from '../../baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ADMIN } from '@/constants/api';

const adminApi = baseApi.injectEndpoints({
	endpoints: build => ({
		admins: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ADMIN,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IAdmin[], meta: IMeta) => {
				return {
					admins: response,
					meta,
				};
			},
			providesTags: [tagTypes.admin],
		}),
		admin: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ADMIN}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.admin],
		}),
		// addAdmin: build.mutation({
		// 	query: data => ({
		// 		url: '/users/create-admin',
		// 		method: 'POST',
		// 		data,
		// 	}),
		// 	invalidatesTags: [tagTypes.admin],
		// }),
		addAdminWithFormData: build.mutation({
			query: data => ({
				url: '/users/create-admin',
				method: 'POST',
				data,
				contentType: 'multipart/form-data',
			}),
			invalidatesTags: [tagTypes.admin],
		}),
		updateAdmin: build.mutation({
			query: data => ({
				url: `${BASE_ADMIN}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.admin],
		}),
		deleteAdmin: build.mutation({
			query: id => ({
				url: `${BASE_ADMIN}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.admin],
		}),
	}),
});

export const {
	useAdminsQuery,
	useAdminQuery,
	// useAddAdminMutation,
	useUpdateAdminMutation,
	useDeleteAdminMutation,
	useAddAdminWithFormDataMutation,
} = adminApi;

export default adminApi;
