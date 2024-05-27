import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ACADEMIC_DEPARTMENT, BASE_ACADEMIC_SEMESTER } from '@/constants/api';
import baseApi from '../baseApi';
import { IAcademicCoreSemester } from '@/types/academic/semester';

const coreAcademicDepartmentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		coreAcademicDepartments: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ACADEMIC_DEPARTMENT,
					method: 'GET',
					params: { limit: 100, page: 1, ...arg },
				};
			},
			transformResponse: (response: IAcademicCoreSemester[], meta: IMeta) => {
				return {
					coreAcademicDepartments: response,
					meta,
				};
			},
			providesTags: [tagTypes.academicDepartment],
		}),
		coreAcademicDepartment: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ACADEMIC_SEMESTER}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.academicDepartment],
		}),
		addCoreAcademicDepartment: build.mutation({
			query: data => ({
				url: BASE_ACADEMIC_DEPARTMENT,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.academicDepartment],
		}),
		updateCoreAcademicDepartment: build.mutation({
			query: data => ({
				url: `${BASE_ACADEMIC_DEPARTMENT}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.academicDepartment],
		}),
		deleteCoreAcademicDepartment: build.mutation({
			query: id => ({
				url: `${BASE_ACADEMIC_DEPARTMENT}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.academicDepartment],
		}),
	}),
});

export const {
	useDeleteCoreAcademicDepartmentMutation,
	useUpdateCoreAcademicDepartmentMutation,
	useAddCoreAcademicDepartmentMutation,
	useCoreAcademicDepartmentQuery,
	useCoreAcademicDepartmentsQuery,
} = coreAcademicDepartmentApi;

export default coreAcademicDepartmentApi;
