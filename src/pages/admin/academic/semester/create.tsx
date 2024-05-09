import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateSemester from '@/components/academic/semester/CreateSemester';

const CreateAcademicSemesterPage: NextPage = () => {
	return (
		<>
			<Helmet>create academic semesters</Helmet>
			<CreateSemester />
		</>
	);
};

export default withLayout(CreateAcademicSemesterPage);
