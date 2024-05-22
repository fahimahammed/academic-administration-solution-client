import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewAllPayment from '@/components/payment/ViewAllPayment';

const ViewAllPaymentPage: NextPage = () => {
	return (
		<>
			<Helmet>Payments</Helmet>
			<ViewAllPayment base="super-admin" />
		</>
	);
};

export default withLayout(ViewAllPaymentPage);