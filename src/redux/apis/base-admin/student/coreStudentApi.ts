import { ICoreStudent, IMeta, IMyCourse, IStudent, QueryParamsType } from '@/types';
import baseApi from '../../baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_STUDENT } from '@/constants/api';

const coreStudentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		coreStudents: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_STUDENT}`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: ICoreStudent[], meta: IMeta) => {
				return {
					coreStudents: response,
					meta,
				};
			},
			providesTags: [tagTypes.student],
		}),
		coreStudent: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_STUDENT}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.student],
		}),
		addCoreStudent: build.mutation({
			query: data => ({
				url: '/users/create-student',
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.student],
		}),
		updateCoreStudent: build.mutation({
			query: data => ({
				url: `${BASE_STUDENT}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.student],
		}),
		deleteCoreStudent: build.mutation({
			query: id => ({
				url: `${BASE_STUDENT}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.student],
		}),
		myCourses: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_STUDENT}/my-courses`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IMyCourse[], meta: IMeta) => {
				return {
					myCourses: response,
					meta,
				};
			},
			providesTags: [tagTypes.student],
		}),
		myCourseSchedules: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_STUDENT}/my-course-schedules`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IStudent[], meta: IMeta) => {
				return {
					myCourseSchedules: response,
					meta,
				};
			},
			providesTags: [tagTypes.student],
		}),
		myAcademicInfos: build.query({
			query: (arg: Record<string, QueryParamsType>) => ({
				url: `${BASE_STUDENT}/my-academic-infos`,
				method: 'GET',
				params: arg,
			}),
			providesTags: [tagTypes.student],
		}),
	}),
});

export const {
	useCoreStudentsQuery,
	useCoreStudentQuery,
	useAddCoreStudentMutation,
	useDeleteCoreStudentMutation,
	useUpdateCoreStudentMutation,
	useMyCoursesQuery,
	useMyCourseSchedulesQuery,
	useMyAcademicInfosQuery,
} = coreStudentApi;

export default coreStudentApi;
