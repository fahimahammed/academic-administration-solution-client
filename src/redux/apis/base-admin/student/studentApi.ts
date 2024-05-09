import { IMeta, IStudent, QueryParamsType } from '@/types';
import baseApi from '../../baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_STUDENT } from '@/constants/api';

const studentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		students: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: `${BASE_STUDENT}`,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IStudent[], meta: IMeta) => {
				return {
					students: response,
					meta,
				};
			},
			providesTags: [tagTypes.student],
		}),
		student: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_STUDENT}/profile/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.student],
		}),
		// addStudent: build.mutation({
		// 	query: data => ({
		// 		url: '/users/create-student',
		// 		method: 'POST',
		// 		data,
		// 	}),
		// 	invalidatesTags: [tagTypes.student],
		// }),
		addStudentWithFormData: build.mutation({
			query: data => ({
				url: '/users/create-student',
				method: 'POST',
				data,
				contentType: 'multipart/form-data',
			}),
			invalidatesTags: [tagTypes.student],
		}),
		updateStudent: build.mutation({
			query: data => ({
				url: `${BASE_STUDENT}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.student],
		}),
		deleteStudent: build.mutation({
			query: id => ({
				url: `${BASE_STUDENT}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.student],
		}),
	}),
});

export const {
	useStudentsQuery,
	useStudentQuery,
	// useAddStudentMutation,
	useAddStudentWithFormDataMutation,
	useUpdateStudentMutation,
	useDeleteStudentMutation,
} = studentApi;

export default studentApi;
