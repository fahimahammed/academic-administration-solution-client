import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import OfferedCourseScheduleDetails from '@/components/offered-course-schedule/OfferedCourseScheduleDetails';

const OfferedCourseScheduleDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view offered course schedule</Helmet>
			<OfferedCourseScheduleDetails id={id as string} />
		</>
	);
};

export default withLayout(OfferedCourseScheduleDetailsPage);
