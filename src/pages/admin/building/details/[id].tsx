import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import BuildingDetails from '@/components/building/BuildingDetails';

const BuildingDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view building</Helmet>
			<BuildingDetails id={id as string} />
		</>
	);
};

export default withLayout(BuildingDetailsPage);
