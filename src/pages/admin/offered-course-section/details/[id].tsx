import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import OfferedCourseSectonDetails from '@/components/offered-course-section/OfferedCourseSectionDetails';

const OfferedCourseDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view offered course section</Helmet>
			<OfferedCourseSectonDetails id={id as string} />
		</>
	);
};

export default withLayout(OfferedCourseDetailsPage);
