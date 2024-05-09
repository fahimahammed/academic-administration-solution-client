import { IMeta, IPermission, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_PERMISSION } from '@/constants/api';
import baseApi from './baseApi';

const permissionApi = baseApi.injectEndpoints({
	endpoints: build => ({
		permissions: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_PERMISSION,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IPermission[], meta: IMeta) => {
				return {
					permissions: response,
					meta,
				};
			},
			providesTags: [tagTypes.permission],
		}),
		permission: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_PERMISSION}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.permission],
		}),
		addPermission: build.mutation({
			query: data => ({
				url: BASE_PERMISSION,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.permission],
		}),
		updatePermission: build.mutation({
			query: data => ({
				url: `${BASE_PERMISSION}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.permission],
		}),
		deletePermission: build.mutation({
			query: id => ({
				url: `${BASE_PERMISSION}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.permission],
		}),
	}),
});

export const {
	usePermissionsQuery,
	usePermissionQuery,
	useAddPermissionMutation,
	useUpdatePermissionMutation,
	useDeletePermissionMutation,
} = permissionApi;

export default permissionApi;
