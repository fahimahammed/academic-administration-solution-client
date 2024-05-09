import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import FacultyCourses from '@/components/base/faculty/FacultyCourses';

const FacultyCoursesPage: NextPage = () => {
	return (
		<>
			<Helmet>faculty courses</Helmet>
			<FacultyCourses />
		</>
	);
};

export default withLayout(FacultyCoursesPage);
