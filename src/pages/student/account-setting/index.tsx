import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const StudentAccountSetting: NextPage = () => {
	return (
		<>
			<Helmet>account setting</Helmet>
			<p>student account setting</p>
		</>
	);
};

export default withLayout(StudentAccountSetting);
