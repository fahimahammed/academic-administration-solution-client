import { Helmet } from '@/components';
import ChangePassword from '@/components/base/ChangePassword';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const StudentChangePassword: NextPage = () => {
	return (
		<>
			<Helmet>Change Password</Helmet>
			<ChangePassword />
		</>
	);
};

export default withLayout(StudentChangePassword);
