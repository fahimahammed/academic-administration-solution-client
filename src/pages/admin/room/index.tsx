import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewRoom from '@/components/rooms/ViewRoom';

const ViewRoomPage: NextPage = () => {
	return (
		<>
			<Helmet>view rooms</Helmet>
			<ViewRoom />
		</>
	);
};

export default withLayout(ViewRoomPage);
