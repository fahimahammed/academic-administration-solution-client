import { IMeta, IOfferedCourse, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_OFFERED_COURSES } from '@/constants/api';
import baseApi from './baseApi';

const offeredCourseApi = baseApi.injectEndpoints({
	endpoints: build => ({
		offeredCourses: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_OFFERED_COURSES,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IOfferedCourse[], meta: IMeta) => {
				return {
					offeredCourses: response,
					meta,
				};
			},
			providesTags: [tagTypes.offeredCourse],
		}),
		offeredCourse: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_OFFERED_COURSES}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.offeredCourse],
		}),
		addOfferedCourse: build.mutation({
			query: data => ({
				url: BASE_OFFERED_COURSES,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.offeredCourse],
		}),
		updateOfferedCourse: build.mutation({
			query: data => ({
				url: `${BASE_OFFERED_COURSES}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.offeredCourse],
		}),
		deleteOfferedCourse: build.mutation({
			query: id => ({
				url: `${BASE_OFFERED_COURSES}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.offeredCourse],
		}),
	}),
});

export const {
	useOfferedCoursesQuery,
	useOfferedCourseQuery,
	useAddOfferedCourseMutation,
	useDeleteOfferedCourseMutation,
	useUpdateOfferedCourseMutation,
} = offeredCourseApi;

export default offeredCourseApi;
