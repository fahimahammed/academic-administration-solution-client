import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateSemesterRegistration from '@/components/semester-registration/CreateSemesterRegistration';

const CreateBuildingPage: NextPage = () => {
	return (
		<>
			<Helmet>create semester registration</Helmet>
			<CreateSemesterRegistration />
		</>
	);
};

export default withLayout(CreateBuildingPage);
