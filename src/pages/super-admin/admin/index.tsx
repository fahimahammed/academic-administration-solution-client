import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewAdmins from '@/components/base/admin/ViewAdmins';

const ViewAdminsPage: NextPage = () => {
	return (
		<>
			<Helmet>view admins</Helmet>
			<ViewAdmins />
		</>
	);
};

export default withLayout(ViewAdminsPage);
