import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditBuilding from '@/components/building/EditBuilding';

const EditBuildingPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit building</Helmet>
			<EditBuilding id={id as string} />
		</>
	);
};

export default withLayout(EditBuildingPage);
