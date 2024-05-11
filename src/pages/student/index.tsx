import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import AccountProfile from '@/components/base/account-profile/AccountProfile';
import { Helmet } from '@/components';
import { USER_ROLE } from '@/constants';

const StudentDashboardPage: NextPage = () => {
	return (
		<>
			<Helmet>Profile</Helmet>
			<AccountProfile title="Student Information" role={USER_ROLE.STUDENT} />
		</>
	);
};

export default withLayout(StudentDashboardPage);
