import { DASHBOARD_META_DATA } from '@/constants/api';
import baseApi from './baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';

const dashboardMetaData = baseApi.injectEndpoints({
    endpoints: build => ({
        metaData: build.query({
            query: () => {
                return {
                    url: `${DASHBOARD_META_DATA}`,
                    method: 'GET',
                };
            },
            providesTags: [tagTypes.meta],
        }),
    }),
});

export const { useMetaDataQuery } = dashboardMetaData;
export default dashboardMetaData;
