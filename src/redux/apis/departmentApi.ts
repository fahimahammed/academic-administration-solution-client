import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_DEPARTMENT } from '@/constants/api';
import { IAcademicFaculty } from '@/types/academic/faculty';
import baseApi from './baseApi';

const departmentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		departments: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_DEPARTMENT,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
				return {
					departments: response,
					meta,
				};
			},
			providesTags: [tagTypes.department],
		}),
		department: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_DEPARTMENT}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.department],
		}),
		addDepertment: build.mutation({
			query: data => ({
				url: BASE_DEPARTMENT,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.department],
		}),
		updateDepartment: build.mutation({
			query: data => ({
				url: `${BASE_DEPARTMENT}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.department],
		}),
		deleteDepartment: build.mutation({
			query: id => ({
				url: `${BASE_DEPARTMENT}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.department],
		}),
	}),
});

export const {
	useDepartmentsQuery,
	useDepartmentQuery,
	useAddDepertmentMutation,
	useUpdateDepartmentMutation,
	useDeleteDepartmentMutation,
} = departmentApi;

export default departmentApi;
