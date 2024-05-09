import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewOfferedCourseSection from '@/components/offered-course-section/ViewOfferedCourseSection';

const ViewOfferedCoursePage: NextPage = () => {
	return (
		<>
			<Helmet>view offered course sections</Helmet>
			<ViewOfferedCourseSection />
		</>
	);
};

export default withLayout(ViewOfferedCoursePage);
