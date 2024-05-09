import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CourseSchedule from '@/components/base/students/CourseSchedule';

const StudentCoursesPage: NextPage = () => {
	return (
		<>
			<Helmet>student course schedules</Helmet>
			<CourseSchedule />
		</>
	);
};

export default withLayout(StudentCoursesPage);
