import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewOfferedCourse from '@/components/offered-course/ViewOfferedCourse';

const ViewOfferedCoursePage: NextPage = () => {
	return (
		<>
			<Helmet>view offered courses</Helmet>
			<ViewOfferedCourse />
		</>
	);
};

export default withLayout(ViewOfferedCoursePage);
