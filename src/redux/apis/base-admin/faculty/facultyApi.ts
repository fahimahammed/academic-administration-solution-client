import { IFaculty, IMeta, QueryParamsType } from '@/types';
import baseApi from '../../baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_FACULTY } from '@/constants/api';

const facultyApi = baseApi.injectEndpoints({
	endpoints: build => ({
		faculties: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_FACULTY,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IFaculty[], meta: IMeta) => {
				return {
					faculties: response,
					meta,
				};
			},
			providesTags: [tagTypes.faculty],
		}),
		faculty: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_FACULTY}/profile/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.faculty],
		}),
		// addFaculty: build.mutation({
		// 	query: data => ({
		// 		url: '/users/create-faculty',
		// 		method: 'POST',
		// 		data,
		// 	}),
		// 	invalidatesTags: [tagTypes.faculty],
		// }),
		addFacultyWithFormData: build.mutation({
			query: data => ({
				url: '/users/create-faculty',
				method: 'POST',
				data,
				contentType: 'multipart/form-data',
			}),
			invalidatesTags: [tagTypes.faculty],
		}),
		updateFaculty: build.mutation({
			query: data => ({
				url: `${BASE_FACULTY}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.faculty],
		}),
		deleteFaculty: build.mutation({
			query: id => ({
				url: `${BASE_FACULTY}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.faculty],
		}),
	}),
});

export const {
	useFacultiesQuery,
	useFacultyQuery,
	// useAddFacultyMutation,
	useDeleteFacultyMutation,
	useUpdateFacultyMutation,
	useAddFacultyWithFormDataMutation,
} = facultyApi;

export default facultyApi;
