import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ACADEMIC_SEMESTER } from '@/constants/api';
import baseApi from '../baseApi';
import { IAcademicSemester } from '@/types/academic/semester';

const academicSemsterApi = baseApi.injectEndpoints({
	endpoints: build => ({
		academicSemesters: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ACADEMIC_SEMESTER,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IAcademicSemester[], meta: IMeta) => {
				return {
					academicSemesters: response,
					meta,
				};
			},
			providesTags: [tagTypes.academicSemester],
		}),
		academicSemester: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ACADEMIC_SEMESTER}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.academicSemester],
		}),
		addAcademicSemester: build.mutation({
			query: data => ({
				url: BASE_ACADEMIC_SEMESTER,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.academicSemester],
		}),
		updateAcademicSemester: build.mutation({
			query: data => ({
				url: `${BASE_ACADEMIC_SEMESTER}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.academicSemester],
		}),
		deleteAcademicSemester: build.mutation({
			query: id => ({
				url: `${BASE_ACADEMIC_SEMESTER}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.academicSemester],
		}),
	}),
});

export const {
	useAcademicSemestersQuery,
	useAcademicSemesterQuery,
	useAddAcademicSemesterMutation,
	useDeleteAcademicSemesterMutation,
	useUpdateAcademicSemesterMutation,
} = academicSemsterApi;

export default academicSemsterApi;
