import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateAdmin from '@/components/base/admin/CreateAdmin';

const CreateAdminPage: NextPage = () => {
	return (
		<>
			<Helmet>create admin</Helmet>
			<CreateAdmin />
		</>
	);
};

export default withLayout(CreateAdminPage);
