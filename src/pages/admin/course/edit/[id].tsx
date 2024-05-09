import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditCourse from '@/components/course/EditCourse';

const EditBuildingPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit coureses</Helmet>
			<EditCourse id={id as string} />
		</>
	);
};

export default withLayout(EditBuildingPage);
