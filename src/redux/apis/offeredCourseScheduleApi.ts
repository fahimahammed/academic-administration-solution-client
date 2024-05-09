import { IMeta, IOfferedCourse, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_OFFERED_COURSES_SCHEDULE } from '@/constants/api';
import baseApi from './baseApi';

const offeredCourseSectionApi = baseApi.injectEndpoints({
	endpoints: build => ({
		offeredCourseSchedules: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_OFFERED_COURSES_SCHEDULE,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IOfferedCourse[], meta: IMeta) => {
				return {
					offeredCourseSchedules: response,
					meta,
				};
			},
			providesTags: [tagTypes.offeredCourseSchedule],
		}),
		offeredCourseSchedule: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_OFFERED_COURSES_SCHEDULE}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.offeredCourseSchedule],
		}),
		addOfferedCourseSchedule: build.mutation({
			query: data => ({
				url: BASE_OFFERED_COURSES_SCHEDULE,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.offeredCourseSchedule],
		}),
		updateOfferedCourseSchedule: build.mutation({
			query: data => ({
				url: `${BASE_OFFERED_COURSES_SCHEDULE}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.offeredCourseSchedule],
		}),
		deleteOfferedCourseSchedule: build.mutation({
			query: id => ({
				url: `${BASE_OFFERED_COURSES_SCHEDULE}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.offeredCourseSchedule],
		}),
	}),
});

export const {
	useOfferedCourseSchedulesQuery,
	useOfferedCourseScheduleQuery,
	useAddOfferedCourseScheduleMutation,
	useDeleteOfferedCourseScheduleMutation,
	useUpdateOfferedCourseScheduleMutation,
} = offeredCourseSectionApi;

export default offeredCourseSectionApi;
