import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import RoomDetails from '@/components/rooms/RoomDetails';

const RoomDetailsPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view room</Helmet>
			<RoomDetails id={id as string} />
		</>
	);
};

export default withLayout(RoomDetailsPage);
