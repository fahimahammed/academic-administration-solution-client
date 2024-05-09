import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateCourse from '@/components/course/CreateCourse';

const CreateBuildingPage: NextPage = () => {
	return (
		<>
			<Helmet>create course</Helmet>
			<CreateCourse />
		</>
	);
};

export default withLayout(CreateBuildingPage);
