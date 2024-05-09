import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import StudentCourseMarks from '@/components/student-enrolled-course-marks/StudentCourseMarks';
import { NextPage } from 'next';

const StudentFacultyPage: NextPage = () => {
	return (
		<>
			<Helmet>student result</Helmet>
			<StudentCourseMarks />
		</>
	);
};

export default withLayout(StudentFacultyPage);
