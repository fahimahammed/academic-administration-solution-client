import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewBuilding from '@/components/building/ViewBuilding';

const ViewBuildingPage: NextPage = () => {
	return (
		<>
			<Helmet>view buildings</Helmet>
			<ViewBuilding />
		</>
	);
};

export default withLayout(ViewBuildingPage);
