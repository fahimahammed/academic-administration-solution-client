import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const AdminAccountSetting: NextPage = () => {
	return (
		<>
			<Helmet>account setting</Helmet>
			<p>admin account setting</p>
		</>
	);
};

export default withLayout(AdminAccountSetting);
