import { Helmet } from '@/components';
import ChangePassword from '@/components/base/ChangePassword';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const FacultyChangePassword: NextPage = () => {
	return (
		<>
			<Helmet>change passowrd</Helmet>
			<ChangePassword />
		</>
	);
};

export default withLayout(FacultyChangePassword);
