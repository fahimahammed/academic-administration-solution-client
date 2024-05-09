import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const SuperAdminDashboardPage: NextPage = () => {
	return (
		<>
			<Helmet>Account profile</Helmet>
			<p>Super Admin</p>
		</>
	);
};

export default withLayout(SuperAdminDashboardPage);
