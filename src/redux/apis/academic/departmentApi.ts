import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ACADEMIC_DEPARTMENT } from '@/constants/api';
import baseApi from '../baseApi';
import { IAcademicDepartment } from '@/types/academic/department';

const academicDepartmentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		academicDepartments: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ACADEMIC_DEPARTMENT,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IAcademicDepartment[], meta: IMeta) => {
				return {
					academicDepartments: response,
					meta,
				};
			},
			providesTags: [tagTypes.academicDepartment],
		}),
		academicDepartment: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ACADEMIC_DEPARTMENT}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.academicDepartment],
		}),
		addAcademicDepartment: build.mutation({
			query: data => ({
				url: BASE_ACADEMIC_DEPARTMENT,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.academicDepartment],
		}),
		updateAcademicDepartment: build.mutation({
			query: data => ({
				url: `${BASE_ACADEMIC_DEPARTMENT}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.academicDepartment],
		}),
		deleteAcademicDepartment: build.mutation({
			query: id => ({
				url: `${BASE_ACADEMIC_DEPARTMENT}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.academicDepartment],
		}),
	}),
});

export const {
	useAcademicDepartmentsQuery,
	useAcademicDepartmentQuery,
	useAddAcademicDepartmentMutation,
	useUpdateAcademicDepartmentMutation,
	useDeleteAcademicDepartmentMutation,
} = academicDepartmentApi;

export default academicDepartmentApi;
