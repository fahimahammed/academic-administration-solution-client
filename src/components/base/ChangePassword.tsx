import React from 'react';
import { Form, FormPasswordField } from '../forms';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import Button from '@/ui/PHUButton';
import { useChangePasswordMutation } from '@/redux/apis/authApi';
import { IError } from '@/types';
import { logger } from '@/services';
type FormData = {
	oldPassword: string;
	newPassword: string;
};
function ChangePassword() {
	const [changePassword] = useChangePasswordMutation();

	const onSubmit = async (values: FormData) => {
		try {
			await changePassword(values).unwrap();
			notifySuccess('password changed successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	return (
		<>
			<div style={{ margin: '20px 0px', display: 'flex', justifyContent: 'center' }}>
				<Form onSubmit={onSubmit}>
					<h3 style={{ margin: '15px 0px' }}>reset password</h3>
					<div style={{ margin: '10px 0px' }}>
						<FormPasswordField size="large" name="oldPassword" label="Old password" />
					</div>
					<div style={{ margin: '10px 0px' }}>
						<FormPasswordField size="large" name="newPassword" label="New password" />
					</div>
					<Button htmlType="submit">submit</Button>
				</Form>
			</div>
		</>
	);
}

export default ChangePassword;
