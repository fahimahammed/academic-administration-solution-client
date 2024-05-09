import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewOfferedCourseSchedule from '@/components/offered-course-schedule/ViewOfferedCourseSchedule';

const ViewOfferedCourseSchedulePage: NextPage = () => {
	return (
		<>
			<Helmet>view offered course schedule</Helmet>
			<ViewOfferedCourseSchedule />
		</>
	);
};

export default withLayout(ViewOfferedCourseSchedulePage);
