import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreatePermission from '@/components/permission/CreatePermission';

const CreatePermissionPage: NextPage = () => {
	return (
		<>
			<Helmet>create permissions</Helmet>
			<CreatePermission />
		</>
	);
};

export default withLayout(CreatePermissionPage);
