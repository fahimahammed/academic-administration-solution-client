import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateFaculty from '@/components/base/faculty/CreateFaculty';

const CreateFacultyPage: NextPage = () => {
	return (
		<>
			<Helmet>create faculty</Helmet>
			<CreateFaculty base="super-admin" />
		</>
	);
};

export default withLayout(CreateFacultyPage);
