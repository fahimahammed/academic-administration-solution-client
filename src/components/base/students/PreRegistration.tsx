import { useMyRegistrationQuery, useStartRegistrationMutation } from '@/redux/apis/semesterRegistrationApi';
import { logger } from '@/services';
import { Alert, Button, Spin } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function PreRegistration() {
	const { data, isLoading } = useMyRegistrationQuery({});
	const [startRegistration] = useStartRegistrationMutation();
	const router = useRouter();

	if (isLoading) return <Spin size="small" />;

	const goToRegistrtionHandler = async () => {
		if (!data?.studentSemesterRegistration) {
			try {
				await startRegistration({}).unwrap();
			} catch (error) {
				logger.error(error);
			}
		}
		router.push('/student/pre-registration');
	};

	return (
		<>
			<div style={{ margin: '10px 0px' }}>
				{data?.semesterRegistration &&
					data?.semesterRegistration?.status === 'ONGOING' &&
					!data?.studentSemesterRegistration?.isConfirmed ? (
					<Button type="primary" danger onClick={goToRegistrtionHandler}>
						Go to Registration
					</Button>
				) : (
					<>
						<div>You are not allowed to do your registration. Stay tuned....</div>
					</>
				)}
			</div>

			{!data?.semesterRegistration ||
				(data?.studentSemesterRegistration?.isConfirmed && (
					<div>
						<Alert
							message={
								<>
									<span>Your registration has been completed successfully</span>
									<Link href="/student/registered-courses" style={{ marginLeft: '10px' }}>
										View your courses
									</Link>
								</>
							}
							type="success"
						/>
					</div>
				))}
		</>
	);
}
