import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import CourseDetails from '@/components/course/CourseDetails';

const BuildingDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view course</Helmet>
			<CourseDetails id={id as string} />
		</>
	);
};

export default withLayout(BuildingDetailsPage);
