import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditRoom from '@/components/rooms/EditRoom';

const EditRoomPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit room</Helmet>
			<EditRoom id={id as string} />
		</>
	);
};

export default withLayout(EditRoomPage);
