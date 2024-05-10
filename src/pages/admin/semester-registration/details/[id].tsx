import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import SemesterRegistrationDetails from '@/components/semester-registration/SemesterRegistrationDetails';

const BuildingDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>View Semester Registration</Helmet>
			<SemesterRegistrationDetails id={id as string} />
		</>
	);
};

export default withLayout(BuildingDetailsPage);
