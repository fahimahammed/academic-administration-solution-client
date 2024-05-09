import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import RegisteredCourses from '@/components/base/students/RegisteredCourses';

const StudentRegisterdCoursesPage: NextPage = () => {
	return (
		<>
			<Helmet>Registered courses</Helmet>
			<RegisteredCourses />
		</>
	);
};

export default withLayout(StudentRegisterdCoursesPage);
