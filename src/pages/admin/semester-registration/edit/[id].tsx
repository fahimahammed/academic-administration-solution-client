import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditSemesterRegistration from '@/components/semester-registration/EditSemesterRegistration';

const EditBuildingPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit semester registrations</Helmet>
			<EditSemesterRegistration id={id as string} />
		</>
	);
};

export default withLayout(EditBuildingPage);
