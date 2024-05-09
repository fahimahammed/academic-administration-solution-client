import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import EditSemester from '@/components/academic/semester/EditSemester';
import { useRouter } from 'next/router';

const EditAcademicSemesterPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit academic semesters</Helmet>
			<EditSemester id={id as string} />
		</>
	);
};

export default withLayout(EditAcademicSemesterPage);
