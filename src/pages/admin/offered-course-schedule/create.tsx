import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateOfferedCourseSchedule from '@/components/offered-course-schedule/CreateOfferedCourseSchedule';

const CreateOfferedCourseSchedulePage: NextPage = () => {
	return (
		<>
			<Helmet>create offered course schedule</Helmet>
			<CreateOfferedCourseSchedule />
		</>
	);
};

export default withLayout(CreateOfferedCourseSchedulePage);
