import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditOfferedCourseSchedule from '@/components/offered-course-schedule/EditOfferedCourseSchedule';

const EditOfferedCourseSchedulePage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit offered course schedule</Helmet>
			<EditOfferedCourseSchedule id={id as string} />
		</>
	);
};

export default withLayout(EditOfferedCourseSchedulePage);
