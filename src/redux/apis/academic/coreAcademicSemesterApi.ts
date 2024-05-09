import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ACADEMIC_SEMESTER } from '@/constants/api';
import baseApi from '../baseApi';
import { IAcademicCoreSemester } from '@/types/academic/semester';

const coreAcademicSemsterApi = baseApi.injectEndpoints({
	endpoints: build => ({
		coreAcademicSemesters: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ACADEMIC_SEMESTER,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IAcademicCoreSemester[], meta: IMeta) => {
				return {
					coreAcademicSemesters: response,
					meta,
				};
			},
			providesTags: [tagTypes.academicSemester],
		}),
		coreAcademicSemester: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ACADEMIC_SEMESTER}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.academicSemester],
		}),
		addCoreAcademicSemester: build.mutation({
			query: data => ({
				url: BASE_ACADEMIC_SEMESTER,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.academicSemester],
		}),
		updateCoreAcademicSemester: build.mutation({
			query: data => ({
				url: `${BASE_ACADEMIC_SEMESTER}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.academicSemester],
		}),
		deleteCoreAcademicSemester: build.mutation({
			query: id => ({
				url: `${BASE_ACADEMIC_SEMESTER}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.academicSemester],
		}),
	}),
});

export const {
	useCoreAcademicSemestersQuery,
	useCoreAcademicSemesterQuery,
	useAddCoreAcademicSemesterMutation,
	useDeleteCoreAcademicSemesterMutation,
	useUpdateCoreAcademicSemesterMutation,
} = coreAcademicSemsterApi;

export default coreAcademicSemsterApi;
