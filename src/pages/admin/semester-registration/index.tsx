import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewSemesterRegistration from '@/components/semester-registration/ViewSemesterRegistration';

const ViewBuildingPage: NextPage = () => {
	return (
		<>
			<Helmet>View Semester Registrations</Helmet>
			<ViewSemesterRegistration />
		</>
	);
};

export default withLayout(ViewBuildingPage);
