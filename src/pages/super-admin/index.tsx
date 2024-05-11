import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { Empty } from 'antd';
import { NextPage } from 'next';

const SuperAdminDashboardPage: NextPage = () => {
	return (
		<>
			<Helmet>Profile</Helmet>

			<Empty description="Super Admin has no profile" />


		</>
	);
};

export default withLayout(SuperAdminDashboardPage);
