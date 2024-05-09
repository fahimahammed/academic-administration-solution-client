import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewFaculties from '@/components/academic/faculty/ViewFaculties';

const AcademicFacultyPage: NextPage = () => {
	return (
		<>
			<Helmet>academic faculties</Helmet>
			<ViewFaculties />
		</>
	);
};

export default withLayout(AcademicFacultyPage);
