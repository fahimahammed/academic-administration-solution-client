import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_BUILDING } from '@/constants/api';
import baseApi from './baseApi';
import { IBuilding } from '@/types/building';

const buildingApi = baseApi.injectEndpoints({
	endpoints: build => ({
		buildings: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_BUILDING,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IBuilding[], meta: IMeta) => {
				return {
					buildings: response,
					meta,
				};
			},
			providesTags: [tagTypes.building],
		}),
		building: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_BUILDING}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.building],
		}),
		addBuilding: build.mutation({
			query: data => ({
				url: BASE_BUILDING,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.building],
		}),
		updateBuilding: build.mutation({
			query: data => ({
				url: `${BASE_BUILDING}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.building],
		}),
		deleteBuilding: build.mutation({
			query: id => ({
				url: `${BASE_BUILDING}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.building],
		}),
	}),
});

export const {
	useBuildingsQuery,
	useBuildingQuery,
	useAddBuildingMutation,
	useDeleteBuildingMutation,
	useUpdateBuildingMutation,
} = buildingApi;

export default buildingApi;
