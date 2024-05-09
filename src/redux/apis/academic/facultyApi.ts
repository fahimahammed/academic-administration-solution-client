import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ACADEMIC_FACULTY } from '@/constants/api';
import baseApi from '../baseApi';
import { IAcademicFaculty } from '@/types/academic/faculty';

const academicFacultyApi = baseApi.injectEndpoints({
	endpoints: build => ({
		academicFaculties: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ACADEMIC_FACULTY,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
				return {
					academicFaculties: response,
					meta,
				};
			},
			providesTags: [tagTypes.academicFaculty],
		}),
		academicFaculty: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ACADEMIC_FACULTY}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.academicFaculty],
		}),
		addAcademicFaculty: build.mutation({
			query: data => ({
				url: BASE_ACADEMIC_FACULTY,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.academicFaculty],
		}),
		updateAcademicFaculty: build.mutation({
			query: data => ({
				url: `${BASE_ACADEMIC_FACULTY}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.academicFaculty],
		}),
		deleteAcademicFaculty: build.mutation({
			query: id => ({
				url: `${BASE_ACADEMIC_FACULTY}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.academicFaculty],
		}),
	}),
});

export const {
	useAcademicFacultiesQuery,
	useAcademicFacultyQuery,
	useAddAcademicFacultyMutation,
	useDeleteAcademicFacultyMutation,
	useUpdateAcademicFacultyMutation,
} = academicFacultyApi;

export default academicFacultyApi;
