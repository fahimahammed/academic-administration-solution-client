import { IBaseUser, IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_USER } from '@/constants/api';
import baseApi from './baseApi';

const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		users: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_USER,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IBaseUser[], meta: IMeta) => {
				return {
					users: response,
					meta,
				};
			},
			providesTags: [tagTypes.user],
		}),
		user: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_USER}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.user],
		}),
		updateUser: build.mutation({
			query: data => ({
				url: `${BASE_USER}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.user],
		}),
		deleteUser: build.mutation({
			query: id => ({
				url: `${BASE_USER}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.user],
		}),
		userAssignedPermission: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				const id = arg.id as string;
				const tempArgs = { ...arg };
				delete tempArgs.id;
				return {
					url: `${BASE_USER}/${id}/assigned-permissions`,
					method: 'GET',
					params: tempArgs,
				};
			},
			transformResponse: (response: IBaseUser[], meta: IMeta) => {
				return {
					assignedPermissions: response,
					meta,
				};
			},
			providesTags: [tagTypes.user],
		}),
		userAvailablePermission: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				const id = arg.id as string;
				const tempArgs = { ...arg };
				delete tempArgs.id;
				return {
					url: `${BASE_USER}/${id}/available-permissions`,
					method: 'GET',
					params: tempArgs,
				};
			},
			transformResponse: (response: IBaseUser[], meta: IMeta) => {
				return {
					availablePermissions: response,
					meta,
				};
			},
			providesTags: [tagTypes.user],
		}),
		assignPermission: build.mutation({
			query: data => {
				const { reqBody, id } = data;
				return {
					url: `${BASE_USER}/${id}/assign-permissions`,
					method: 'POST',
					data: reqBody,
				};
			},
			invalidatesTags: [tagTypes.user],
		}),
		removePermission: build.mutation({
			query: data => {
				const { reqBody, id } = data;
				return {
					url: `${BASE_USER}/${id}/remove-permissions`,
					method: 'POST',
					data: reqBody,
				};
			},
			invalidatesTags: [tagTypes.user],
		}),
	}),
});

export const {
	useUsersQuery,
	useUserQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useUserAssignedPermissionQuery,
	useUserAvailablePermissionQuery,
	useAssignPermissionMutation,
	useRemovePermissionMutation,
} = userApi;

export default userApi;
