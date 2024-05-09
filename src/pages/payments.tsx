import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { useRouter } from 'next/router';
import React from 'react';

function PaymentResultPage() {
	const router = useRouter();
	const { status } = router.query;
	const resultTitle = status === 'success' ? 'Successfully Paid' : 'Something went wrong';
	return (
		<>
			<Result
				status={status as ResultStatusType}
				title={resultTitle}
				extra={[
					<Button
						type="primary"
						key="console"
						onClick={() => {
							router.push('/student/payment');
						}}
					>
						back to payment list
					</Button>,
				]}
			/>
		</>
	);
}

export default PaymentResultPage;
