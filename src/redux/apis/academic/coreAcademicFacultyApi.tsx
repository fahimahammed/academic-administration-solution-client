import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ACADEMIC_FACULTY } from '@/constants/api';
import baseApi from '../baseApi';
import { IAcademicCoreFaculty } from '@/types/academic/faculty';

const coreAcademicFacultyApi = baseApi.injectEndpoints({
	endpoints: build => ({
		coreAcademicFaculties: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ACADEMIC_FACULTY,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IAcademicCoreFaculty[], meta: IMeta) => {
				return {
					coreAcademicFaculties: response,
					meta,
				};
			},
			providesTags: [tagTypes.academicFaculty],
		}),
		coreAcademicFaculty: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ACADEMIC_FACULTY}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.academicFaculty],
		}),
		addCoreAcademicFaculty: build.mutation({
			query: data => ({
				url: BASE_ACADEMIC_FACULTY,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.academicFaculty],
		}),
		updateCoreAcademicFaculty: build.mutation({
			query: data => ({
				url: `${BASE_ACADEMIC_FACULTY}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.academicFaculty],
		}),
		deleteCoreAcademicFaculty: build.mutation({
			query: id => ({
				url: `${BASE_ACADEMIC_FACULTY}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.academicFaculty],
		}),
	}),
});

export const {
	useAddCoreAcademicFacultyMutation,
	useDeleteCoreAcademicFacultyMutation,
	useUpdateCoreAcademicFacultyMutation,
	useCoreAcademicFacultiesQuery,
	useCoreAcademicFacultyQuery,
} = coreAcademicFacultyApi;

export default coreAcademicFacultyApi;
