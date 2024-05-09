import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import EnrolledCourseMark from '@/components/base/students/EnrolledCourseMark';

const StudentCoursesMarkPage: NextPage = () => {
	return (
		<>
			<Helmet>student course mark</Helmet>
			<EnrolledCourseMark />
		</>
	);
};

export default withLayout(StudentCoursesMarkPage);
