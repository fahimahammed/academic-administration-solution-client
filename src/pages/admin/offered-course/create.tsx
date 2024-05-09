import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateOfferedCourse from '@/components/offered-course/CreateOfferedCourse';

const CreateOfferedCourese: NextPage = () => {
	return (
		<>
			<Helmet>create offered courese</Helmet>
			<CreateOfferedCourse />
		</>
	);
};

export default withLayout(CreateOfferedCourese);
