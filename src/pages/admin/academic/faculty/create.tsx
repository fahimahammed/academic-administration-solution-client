import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateFaculty from '@/components/academic/faculty/CreateFaculty';

const EditAcademicFacultyPage: NextPage = () => {
	return (
		<>
			<Helmet>create academic faculty</Helmet>
			<CreateFaculty />
		</>
	);
};

export default withLayout(EditAcademicFacultyPage);
