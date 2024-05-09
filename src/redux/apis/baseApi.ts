import { tagTypelist } from '@/constants/redux-api-tagtypes';
import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery';
import { getBaseUrl } from '@/helpers/configs';
import { createApi } from '@reduxjs/toolkit/query/react';

const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: axiosBaseQuery({
		baseUrl: getBaseUrl(),
	}),
	endpoints: () => ({}),
	tagTypes: tagTypelist,
});

export default baseApi;
