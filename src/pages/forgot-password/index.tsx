import { Helmet } from '@/components';
import { Form, FormInput } from '@/components/forms';
import { useForgotPasswordMutation } from '@/redux/apis/authApi';
import { logger } from '@/services';
import { IError } from '@/types';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { Col, Row } from 'antd';
import Link from 'next/link';
import forgotPassBanner from '../../assets/images/forgot-password.webp'
import logoPrimary from './../../assets/images/logo-primary 2.png'
import Image from 'next/image';

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
			<div style={{ backgroundColor: "#F2F5FF" }}>
				<Row
					justify="space-between"
					align="middle"
					style={{ minHeight: '100vh', display: 'flex', flexWrap: 'wrap', margin: '0px auto', maxWidth: '1124px' }}
					gutter={{ xs: 24, xl: 12 }}
				>
					<Col xs={24} xl={12}>
						<Image
							src={forgotPassBanner}
							alt="Logo"
							height={500}
							width={500}
						/>
					</Col>
					<Col xs={24} xl={12} style={{ backgroundColor: "white", padding: "5rem 3.5rem", borderRadius: "10px", margin: "0 auto" }}>
						<div style={{ margin: '0 20px' }}>
							<Image
								src={logoPrimary}
								alt="Logo"
								height={42}
								width={100}
								style={{ marginBottom: '10px' }}
							/>
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
					</Col>
				</Row>
			</div>

		</>
	);
}

export default ForgotPasswordPage;
