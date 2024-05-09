import { BASE_AUTH } from '@/constants/api';
import baseApi from './baseApi';
import { tagTypes } from '@/constants/redux-api-tagtypes';

const authApi = baseApi.injectEndpoints({
	endpoints: build => ({
		adminLogin: build.mutation({
			query: loginData => ({
				url: `${BASE_AUTH}/login`,
				method: 'POST',
				data: loginData,
			}),
			invalidatesTags: [tagTypes.user],
		}),
		changePassword: build.mutation({
			query: changePasswordPayload => ({
				url: `${BASE_AUTH}/change-password`,
				method: 'POST',
				data: changePasswordPayload,
			}),
		}),
		resetPassword: build.mutation({
			query: resetPasswordPayload => ({
				url: `${BASE_AUTH}/reset-password`,
				method: 'POST',
				data: resetPasswordPayload,
			}),
		}),
		forgotPassword: build.mutation({
			query: forgotPasswordPayload => ({
				url: `${BASE_AUTH}/forgot-password`,
				method: 'POST',
				data: forgotPasswordPayload,
			}),
		}),
	}),
});

export const { useAdminLoginMutation, useChangePasswordMutation, useForgotPasswordMutation, useResetPasswordMutation } =
	authApi;

export default authApi;
