import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateOfferedCourseSection from '@/components/offered-course-section/CreateOfferedCourseSection';

const CreateOfferedCourese: NextPage = () => {
	return (
		<>
			<Helmet>create offered course sections</Helmet>
			<CreateOfferedCourseSection />
		</>
	);
};

export default withLayout(CreateOfferedCourese);
