import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateRoom from '@/components/rooms/CreateRoom';

const CreateRoomPage: NextPage = () => {
	return (
		<>
			<Helmet>create room</Helmet>
			<CreateRoom />
		</>
	);
};

export default withLayout(CreateRoomPage);
