import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateBuilding from '@/components/building/CreateBuilding';

const CreateBuildingPage: NextPage = () => {
	return (
		<>
			<Helmet>create building</Helmet>
			<CreateBuilding />
		</>
	);
};

export default withLayout(CreateBuildingPage);
