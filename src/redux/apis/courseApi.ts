import { ICourse, IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_COURSE } from '@/constants/api';
import baseApi from './baseApi';

const courseApi = baseApi.injectEndpoints({
	endpoints: build => ({
		courses: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_COURSE,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: ICourse[], meta: IMeta) => {
				return {
					courses: response,
					meta,
				};
			},
			providesTags: [tagTypes.course],
		}),
		course: build.query({
			query: (id: string) => ({
				url: `${BASE_COURSE}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.course],
		}),
		addCourse: build.mutation({
			query: data => ({
				url: BASE_COURSE,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.course],
		}),
		updateCourse: build.mutation({
			query: data => ({
				url: `${BASE_COURSE}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.course],
		}),
		deleteCourse: build.mutation({
			query: id => ({
				url: `${BASE_COURSE}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.course],
		}),
	}),
});

export const { useCoursesQuery, useCourseQuery, useAddCourseMutation, useDeleteCourseMutation, useUpdateCourseMutation } =
	courseApi;

export default courseApi;
