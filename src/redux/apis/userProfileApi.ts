import { BASE_USER } from '@/constants/api';
import baseApi from './baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';

const userProfileApi = baseApi.injectEndpoints({
	endpoints: build => ({
		userProfile: build.query({
			query: () => {
				return {
					url: `${BASE_USER}/my-profile`,
					method: 'GET',
				};
			},
			providesTags: [tagTypes.user],
		}),
	}),
});

export const { useUserProfileQuery } = userProfileApi;
export default userProfileApi;
