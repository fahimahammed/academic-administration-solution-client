import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { ViewStudents } from '@/components/base/students';

const ViewStudentPage: NextPage = () => {
	return (
		<>
			<Helmet>View Students</Helmet>
			<ViewStudents base="super-admin" />
		</>
	);
};

export default withLayout(ViewStudentPage);
