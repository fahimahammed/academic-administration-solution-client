import { IMeta, ISemesterRegistration, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_SEMESTER_REGISTRATION } from '@/constants/api';
import baseApi from './baseApi';

const semesterRegistrationApi = baseApi.injectEndpoints({
	endpoints: build => ({
		semesterRegistrations: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_SEMESTER_REGISTRATION,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: ISemesterRegistration[], meta: IMeta) => {
				return {
					semesterRegistrations: response,
					meta,
				};
			},
			providesTags: [tagTypes.semesterRegistration],
		}),
		semesterRegistration: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_SEMESTER_REGISTRATION}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.semesterRegistration],
		}),
		addSemesterRegistrations: build.mutation({
			query: data => ({
				url: BASE_SEMESTER_REGISTRATION,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.semesterRegistration],
		}),
		updateSemesterRegistrations: build.mutation({
			query: data => ({
				url: `${BASE_SEMESTER_REGISTRATION}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.semesterRegistration],
		}),
		deleteSemesterRegistrations: build.mutation({
			query: id => ({
				url: `${BASE_SEMESTER_REGISTRATION}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.semesterRegistration],
		}),
		myRegistration: build.query({
			query: () => ({
				url: `${BASE_SEMESTER_REGISTRATION}/my-registration`,
				method: 'GET',
			}),
			providesTags: [tagTypes.courseRegisration],
		}),
		startRegistration: build.mutation({
			query: () => ({
				url: `${BASE_SEMESTER_REGISTRATION}/start-registration`,
				method: 'POST',
			}),
		}),
		mySemesterRegistrationCourses: build.query({
			query: () => ({
				url: `${BASE_SEMESTER_REGISTRATION}/my-semester-registration-courses
				`,
				method: 'GET',
			}),
			providesTags: [tagTypes.courseRegisration],
		}),
		enrollIntoCourse: build.mutation({
			query: data => ({
				url: `${BASE_SEMESTER_REGISTRATION}/enroll-into-course`,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.courseRegisration],
		}),
		withdrawFromCourse: build.mutation({
			query: data => ({
				url: `${BASE_SEMESTER_REGISTRATION}/withdraw-from-course`,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.courseRegisration],
		}),
		confirmMyRegistration: build.mutation({
			query: () => ({
				url: `${BASE_SEMESTER_REGISTRATION}/confirm-registration`,
				method: 'POST',
			}),
			invalidatesTags: [tagTypes.courseRegisration],
		}),
		startNewSemester: build.mutation({
			query: id => ({
				url: `${BASE_SEMESTER_REGISTRATION}/${id}/start-new-semester`,
				method: 'POST',
			}),
			invalidatesTags: [tagTypes.courseRegisration],
		}),
	}),
});

export const {
	useSemesterRegistrationsQuery,
	useSemesterRegistrationQuery,
	useAddSemesterRegistrationsMutation,
	useDeleteSemesterRegistrationsMutation,
	useUpdateSemesterRegistrationsMutation,
	useMyRegistrationQuery,
	useStartRegistrationMutation,
	useMySemesterRegistrationCoursesQuery,
	useEnrollIntoCourseMutation,
	useConfirmMyRegistrationMutation,
	useWithdrawFromCourseMutation,
	useStartNewSemesterMutation,
} = semesterRegistrationApi;

export default semesterRegistrationApi;
