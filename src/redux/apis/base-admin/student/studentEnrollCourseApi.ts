import { IMeta, IStudentEnrolledCourse, QueryParamsType } from '@/types';
import baseApi from '../../baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_STUDENT_ENROLLED_COURSE } from '@/constants/api';

const studentEnrollCourseApi = baseApi.injectEndpoints({
	endpoints: build => ({
		studentEnrolledCourses: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_STUDENT_ENROLLED_COURSE}`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IStudentEnrolledCourse[], meta: IMeta) => {
				return {
					studentEnrolledCourses: response,
					meta,
				};
			},
			providesTags: [tagTypes.student],
		}),
		studentEnrolledCourse: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_STUDENT_ENROLLED_COURSE}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.student],
		}),
		updateStudentEnrolledCourse: build.mutation({
			query: data => ({
				url: `${BASE_STUDENT_ENROLLED_COURSE}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.student],
		}),
	}),
});

export const { useUpdateStudentEnrolledCourseMutation, useStudentEnrolledCourseQuery, useStudentEnrolledCoursesQuery } =
	studentEnrollCourseApi;

export default studentEnrollCourseApi;
