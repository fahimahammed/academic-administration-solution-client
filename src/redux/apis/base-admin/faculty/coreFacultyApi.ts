import { IFacultyCourse, IMeta, QueryParamsType } from '@/types';
import baseApi from '../../baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_FACULTY } from '@/constants/api';
import { ICoreFaculty } from '@/types/academic/faculty';

const coreFacultyApi = baseApi.injectEndpoints({
	endpoints: build => ({
		coreFaculties: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_FACULTY,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: ICoreFaculty[], meta: IMeta) => {
				return {
					coreFaculties: response,
					meta,
				};
			},
			providesTags: [tagTypes.faculty],
		}),
		coreFaculty: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_FACULTY}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.faculty],
		}),
		addCoreFaculty: build.mutation({
			query: data => ({
				url: '/users/create-faculty',
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.faculty],
		}),
		updateCoreFaculty: build.mutation({
			query: data => ({
				url: `${BASE_FACULTY}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.faculty],
		}),
		deleteCoreFaculty: build.mutation({
			query: id => ({
				url: `${BASE_FACULTY}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.faculty],
		}),
		facultyCourses: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_FACULTY}/my-courses`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IFacultyCourse[], meta: IMeta) => {
				return {
					myCourses: response,
					meta,
				};
			},
			providesTags: [tagTypes.student],
		}),
		facultyCourseStudents: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_FACULTY}/my-course-students`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: ICoreFaculty[], meta: IMeta) => {
				return {
					myCourseStudents: response,
					meta,
				};
			},
			providesTags: [tagTypes.student],
		}),
	}),
});

export const {
	useCoreFacultiesQuery,
	useCoreFacultyQuery,
	useAddCoreFacultyMutation,
	useDeleteCoreFacultyMutation,
	useUpdateCoreFacultyMutation,
	useFacultyCoursesQuery,
	useFacultyCourseStudentsQuery,
} = coreFacultyApi;

export default coreFacultyApi;
