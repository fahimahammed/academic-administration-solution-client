import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditOfferedCourse from '@/components/offered-course/EditOfferedCourse';

const EditOfferedCoursePage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit offered course</Helmet>
			<EditOfferedCourse id={id as string} />
		</>
	);
};

export default withLayout(EditOfferedCoursePage);
