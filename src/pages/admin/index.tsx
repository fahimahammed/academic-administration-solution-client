import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import AccountProfile from '@/components/base/account-profile/AccountProfile';
import { USER_ROLE } from '@/constants';

const AdminDashboardPage: NextPage = () => {
	return (
		<>
			<Helmet>Profile</Helmet>
			<AccountProfile title="Admin Information" role={USER_ROLE.ADMIN} />
		</>
	);
};

export default withLayout(AdminDashboardPage);
