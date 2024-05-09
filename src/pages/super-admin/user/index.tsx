import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewUsers from '@/components/user/ViewUsers';

const ViewUsersPage: NextPage = () => {
	return (
		<>
			<Helmet>view users</Helmet>
			<ViewUsers />
		</>
	);
};

export default withLayout(ViewUsersPage);
