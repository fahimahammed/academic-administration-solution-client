import { Helmet } from '@/components';
import ChangePassword from '@/components/base/ChangePassword';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const StudentChangePassword: NextPage = () => {
	return (
		<>
			<Helmet>change password</Helmet>
			<ChangePassword />
		</>
	);
};

export default withLayout(StudentChangePassword);
