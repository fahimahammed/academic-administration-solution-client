import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const FacultyAccountSetting: NextPage = () => {
	return (
		<>
			<Helmet>account setting</Helmet>
			<p>faculty account setting</p>
		</>
	);
};

export default withLayout(FacultyAccountSetting);
