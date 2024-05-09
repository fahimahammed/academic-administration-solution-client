import { Helmet } from '@/components';
import { Form, FormInput } from '@/components/forms';
import { useForgotPasswordMutation } from '@/redux/apis/authApi';
import { logger } from '@/services';
import { IError } from '@/types';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';

function ForgotPasswordPage() {
	const [forgotPassword] = useForgotPasswordMutation();
	const onSubmit = async (values: { id: string }) => {
		try {
			await forgotPassword(values).unwrap();
			notifySuccess('Reset link has been sent to your email');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};
	return (
		<>
			<Helmet>forgot password</Helmet>
			<div style={{ margin: '100px 0', display: 'flex', justifyContent: 'center' }}>
				<Form onSubmit={onSubmit}>
					<h3 style={{ margin: '5px 0' }}>forget password</h3>
					<div style={{ margin: '5px 0' }}>
						<FormInput name="id" placeholder="enter your id" />
					</div>
					<PHUButton htmlType="submit">submit</PHUButton>
				</Form>
			</div>
		</>
	);
}

export default ForgotPasswordPage;
