import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import EditPermission from '@/components/permission/EditPermission';

function PermissionEditPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit permission</Helmet>
			<EditPermission id={id as string} />
		</>
	);
}

export default withLayout(PermissionEditPage);
