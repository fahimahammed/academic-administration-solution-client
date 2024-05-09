import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import OfferedCourseDetails from '@/components/offered-course/OfferedCourseDetails';

const OfferedCourseDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view offered course</Helmet>
			<OfferedCourseDetails id={id as string} />
		</>
	);
};

export default withLayout(OfferedCourseDetailsPage);
