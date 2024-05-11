import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { CreateStudent } from '@/components/base/students';

const CreateStudentPage: NextPage = () => {
	return (
		<>
			<Helmet>Create Student</Helmet>
			<CreateStudent base="super-admin" />
		</>
	);
};

export default withLayout(CreateStudentPage);
