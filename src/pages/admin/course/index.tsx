import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewCourse from '@/components/course/ViewCourse';

const ViewBuildingPage: NextPage = () => {
	return (
		<>
			<Helmet>view courses</Helmet>
			<ViewCourse />
		</>
	);
};

export default withLayout(ViewBuildingPage);
