import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import EnrolledCourses from '@/components/base/students/EnrolledCourse';

const StudentCoursesPage: NextPage = () => {
	return (
		<>
			<Helmet>student courses</Helmet>
			<EnrolledCourses />
		</>
	);
};

export default withLayout(StudentCoursesPage);
