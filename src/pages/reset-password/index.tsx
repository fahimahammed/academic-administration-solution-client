import { Helmet } from '@/components';
import ResetPassword from '@/components/base/ResetPassword';
import { useRouter } from 'next/router';
import React from 'react';

function ResetPasswordPage() {
	const router = useRouter();
	const { id, token } = router.query;

	return (
		<div>
			<Helmet>reset password</Helmet>
			<ResetPassword id={id} token={token} />
		</div>
	);
}

export default ResetPasswordPage;
