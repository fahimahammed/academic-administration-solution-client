import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewSemesters from '@/components/academic/semester/ViewSemesters';

const AcademicSemesterPage: NextPage = () => {
	return (
		<>
			<Helmet>academic semesters</Helmet>
			<ViewSemesters />
		</>
	);
};

export default withLayout(AcademicSemesterPage);
