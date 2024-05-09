import { IMeta, QueryParamsType } from '@/types';
import { tagTypes } from '@/constants/redux-api-tagtypes';
import { BASE_ROOM } from '@/constants/api';
import baseApi from './baseApi';
import { IRoom } from '@/types/room';

const roomApi = baseApi.injectEndpoints({
	endpoints: build => ({
		rooms: build.query({
			query: (arg: Record<string, QueryParamsType>) => {
				return {
					url: BASE_ROOM,
					method: 'GET',
					params: arg,
				};
			},
			transformResponse: (response: IRoom[], meta: IMeta) => {
				return {
					rooms: response,
					meta,
				};
			},
			providesTags: [tagTypes.room],
		}),
		room: build.query({
			query: (id: string | string[] | undefined) => ({
				url: `${BASE_ROOM}/${id}`,
				method: 'GET',
			}),
			providesTags: [tagTypes.room],
		}),
		addRoom: build.mutation({
			query: data => ({
				url: BASE_ROOM,
				method: 'POST',
				data,
			}),
			invalidatesTags: [tagTypes.room],
		}),
		updateRoom: build.mutation({
			query: data => ({
				url: `${BASE_ROOM}/${data.id}`,
				method: 'PATCH',
				data: data.body,
			}),
			invalidatesTags: [tagTypes.room],
		}),
		deleteRoom: build.mutation({
			query: id => ({
				url: `${BASE_ROOM}/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tagTypes.room],
		}),
	}),
});

export const { useRoomsQuery, useRoomQuery, useAddRoomMutation, useDeleteRoomMutation, useUpdateRoomMutation } = roomApi;

export default roomApi;
