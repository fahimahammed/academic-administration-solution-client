import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const SuperAdminDashboardPage: NextPage = () => {
	return (
		<>
			<Helmet>account profile</Helmet>
			<p>super admin profile coming soon ...</p>
		</>
	);
};

export default withLayout(SuperAdminDashboardPage);
