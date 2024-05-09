import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditOfferedCourseSection from '@/components/offered-course-section/EditOfferedCourseSection';

const EditOfferedCoursePage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit offered course section</Helmet>
			<EditOfferedCourseSection id={id as string} />
		</>
	);
};

export default withLayout(EditOfferedCoursePage);
