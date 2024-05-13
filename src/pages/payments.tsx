import { useCompletePaymentQuery } from '@/redux/apis/paymentApi';
import { Button, Result, Spin } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { useRouter } from 'next/router';

function PaymentResultPage() {
	const router = useRouter();
	const { status, tnxId } = router.query;

	const { data: paymentData, isLoading, isError } = useCompletePaymentQuery(tnxId as string);

	if (isLoading) return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '50px 0' }}>
			<Spin size='large' />
			<h3 style={{ margin: "20px 0", color: 'gray' }}>Processing...</h3>
			<p>Please wait while we process your payment.</p>
			<p>Do not refresh the page or navigate away while this is processing.</p>
			<p>Thank you</p>
		</div>
	)

	let resultStatus = (status === 'success' && paymentData && !isError) ? 'success' : 'error';

	const resultTitle = (status === 'success' && paymentData && !isError) ? 'Successfully Paid' : 'Something went wrong';

	return (
		<>
			<Result
				status={resultStatus as ResultStatusType}
				title={resultTitle}
				extra={[
					<Button
						type="primary"
						key="console"
						onClick={() => {
							router.push('/student/payment');
						}}
					>
						{isLoading ? "Validating Payment..." : "Back to Payment History"}

					</Button>,
				]}
			/>
		</>
	);
}

export default PaymentResultPage;
