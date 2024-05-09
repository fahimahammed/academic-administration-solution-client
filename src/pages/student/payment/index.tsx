import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewMyPayment from '@/components/payment/ViewMyPayment';

const PaymentPage: NextPage = () => {
	return (
		<>
			<Helmet>payment</Helmet>
			<ViewMyPayment />
		</>
	);
};

export default withLayout(PaymentPage);
