import { Form, FormInput, FormPasswordField } from '@/components/forms';
import { COMMON_ROUTES } from '@/constants';
import { useResetPasswordMutation } from '@/redux/apis/authApi';
import { logger } from '@/services';
import { IError } from '@/types';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { useRouter } from 'next/router';
import React from 'react';

type FormData = {
	id: string | string[] | undefined;
	token: string | string[] | undefined;
};

function ResetPassword({ id, token }: FormData) {
	const [resetPassword] = useResetPasswordMutation();
	const router = useRouter();

	if (!id && !token) return null; // this logic is temporary will be removed very soon

	const defaultValues: { id: string | string[] | undefined; newPassword: string } = {
		id,
		newPassword: '',
	};

	const onSubmit = async (values: FormData) => {
		try {
			await resetPassword(values).unwrap();
			notifySuccess('password reset successfully');
			router.push(COMMON_ROUTES.LOGIN);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	return (
		<div style={{ margin: '100px 0', display: 'flex', justifyContent: 'center' }}>
			<Form onSubmit={onSubmit} defaultValues={defaultValues}>
				<h3>reset password</h3>
				<div style={{ margin: '5px 0' }}>
					<FormInput type="text" name="id" label="User Id" />
				</div>
				<div style={{ margin: '5px 0' }}>
					<FormPasswordField name="newPassword" label="New password" />
				</div>
				<PHUButton htmlType="submit">submit</PHUButton>
			</Form>
		</div>
	);
}

export default ResetPassword;
