/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { logger, storeUserInfo } from '@/services';
import { Helmet } from '@/components';
import { useDispatch } from 'react-redux';
import { decodeToken } from '@/utils/jwt';
import { useRouter } from 'next/router';
import { getFromLocalStorage } from '@/utils/local-storage';
import { COMMON_ROUTES, START_BASE_ROUTES, USER_ROLE, authKey } from '@/constants';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import Link from 'next/link';
import PHUButton from '@/ui/PHUButton';
import { Col, Row } from 'antd';
import { Form, FormInput, FormPasswordField } from '@/components/forms';
import { useAdminLoginMutation } from '@/redux/apis/authApi';
import { setAuth } from '@/redux/slices/authSlice';
import { IError } from '@/types';
import Styles from './Login.module.css'

type FormValues = {
	id: string;
	password: string;
};

export default function StudentLoginPage() {
	const router = useRouter();
	const dispatch = useDispatch();
	const token = getFromLocalStorage(authKey) as string;
	const [adminLogin] = useAdminLoginMutation();

	useEffect(() => {
		if (!token) {
			router.push(COMMON_ROUTES.LOGIN);
		} else {
			const userInfo = decodeToken(token) as Record<string, string>;

			if (userInfo.role === USER_ROLE.SUPER_ADMIN) router.push(START_BASE_ROUTES.SUPER_ADMIN);
			else if (userInfo.role === USER_ROLE.ADMIN) router.push(START_BASE_ROUTES.ADMIN);
			else if (userInfo.role === USER_ROLE.STUDENT) router.push(START_BASE_ROUTES.STUDENT);
			else if (userInfo.role === USER_ROLE.FACULTY) router.push(START_BASE_ROUTES.FACULTY);
		}
	}, [token]);

	const onSubmit: SubmitHandler<FormValues> = async data => {
		try {
			const res = await adminLogin({ ...data }).unwrap();
			dispatch(setAuth({ accessToken: res?.accessToken }));
			storeUserInfo({
				accessToken: res?.accessToken,
			});

			notifySuccess('Logged in successfully');

			const userInfo = decodeToken(res?.accessToken) as Record<string, string>;

			if (userInfo.role === USER_ROLE.SUPER_ADMIN) router.push(START_BASE_ROUTES.SUPER_ADMIN);
			else if (userInfo.role === USER_ROLE.ADMIN)
				router.push(
					!res?.needsPasswordChange
						? START_BASE_ROUTES.ADMIN
						: `${START_BASE_ROUTES.ADMIN}/${COMMON_ROUTES.CHANGE_PASSWORD}`
				);
			else if (userInfo.role === USER_ROLE.STUDENT)
				router.push(
					!res?.needsPasswordChange
						? START_BASE_ROUTES.STUDENT
						: `${START_BASE_ROUTES.STUDENT}/${COMMON_ROUTES.CHANGE_PASSWORD}`
				);
			else if (userInfo.role === USER_ROLE.FACULTY)
				router.push(
					!res?.needsPasswordChange
						? START_BASE_ROUTES.FACULTY
						: `${START_BASE_ROUTES.FACULTY}/${COMMON_ROUTES.CHANGE_PASSWORD}`
				);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	return (
		<>
			<Helmet>Login</Helmet>

			<div className={Styles.login_box}>
				<Row
					justify="center"
					align="middle"
					style={{ minHeight: '100vh', display: 'flex', margin: '0px 50px' }}
					gutter={{ xs: 24, xl: 12 }}
				>
					<Col span={8}>
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Wikimedia_Commons_logo_white.png/1200px-Wikimedia_Commons_logo_white.png" alt="Your Logo" style={{ marginBottom: '20px', height: '70px' }} /> {/* Add your logo here */}
						<Form onSubmit={onSubmit}>
							<h1 style={{ marginBottom: '10px', color: 'white' }}>Login first to your account</h1>
							<p style={{ marginBottom: '20px', color: 'white' }}>Enter your userId and password to log in.</p>
							<div style={{ margin: '10px 0px', color: "white" }}>
								<label htmlFor="id" className="font-semibold">
									User Id
								</label>
								<FormInput placeholder='User ID' size="large" type="text" name="id" />
							</div>
							<div style={{ margin: '10px 0px', color: 'white' }}>
								<label htmlFor="password" className="font-semibold">
									Password
								</label>
								<FormPasswordField placeholder='Password' size="large" id="password" name="password" />
							</div>

							<div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
								<div style={{ marginLeft: 'auto' }}>
									<Link href="/forgot-password">Forgot password?</Link>
								</div>
							</div>

							<PHUButton htmlType="submit">Login</PHUButton>
						</Form>
					</Col>
				</Row>
			</div>
		</>
	);
}
