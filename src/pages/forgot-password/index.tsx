import { Helmet } from '@/components';
import { Form, FormInput } from '@/components/forms';
import { useForgotPasswordMutation } from '@/redux/apis/authApi';
import { logger } from '@/services';
import { IError } from '@/types';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import Link from 'next/link';

function ForgotPasswordPage() {
	const [forgotPassword] = useForgotPasswordMutation();
	const onSubmit = async (values: { userId: string }) => {
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
			<Helmet>Forgot Password</Helmet>
			<div style={{ margin: '0', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Form onSubmit={onSubmit}>
					<h1 style={{ margin: '5px 0' }}>Forgot Password?</h1>
					<p style={{ marginBottom: '25px', color: 'gray' }}>Enter your user id to reset password.</p>
					<div style={{ margin: '5px 0 15px 0' }}>
						<FormInput name="userId" size="large" placeholder="Enter your id" type="text " />
						{/* <FormInput placeholder='User ID' size="large" type="text" name="id" /> */}
					</div>
					<PHUButton htmlType="submit" size='large'>Reset Password</PHUButton>

					<div style={{ display: 'flex', alignItems: 'center' }}>
						<p style={{ marginTop: '30px', color: 'gray' }}>Remember your password?</p>
						<div style={{ marginLeft: 'auto', marginTop: '30px' }}>
							<Link href="/login">Go Back</Link>
						</div>
					</div>
				</Form>
			</div>
		</>
	);
}

export default ForgotPasswordPage;
