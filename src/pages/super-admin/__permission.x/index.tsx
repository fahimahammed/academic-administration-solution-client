import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewPermissions from '@/components/permission/ViewPermission';

const ViewPermissionPage: NextPage = () => {
	return (
		<>
			<Helmet>view permissions</Helmet>
			<ViewPermissions />
		</>
	);
};

export default withLayout(ViewPermissionPage);
