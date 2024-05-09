import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import FacultyCourseSchedule from '@/components/base/faculty/FacultyCourseStudents';

const FacultyCoursesPage: NextPage = () => {
	return (
		<>
			<Helmet>faculty course schedules</Helmet>
			<FacultyCourseSchedule />
		</>
	);
};

export default withLayout(FacultyCoursesPage);
