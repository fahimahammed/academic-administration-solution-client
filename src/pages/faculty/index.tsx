import { Helmet } from '@/components';
import AccountProfile from '@/components/base/account-profile/AccountProfile';
import withLayout from '@/components/layouts/withLayout';
import { USER_ROLE } from '@/constants';
import { NextPage } from 'next';

const FacultyDashboardPage: NextPage = () => {
	return (
		<>
			<Helmet>Profile</Helmet>
			<AccountProfile title="faculty information" role={USER_ROLE.FACULTY} />
		</>
	);
};

export default withLayout(FacultyDashboardPage);
