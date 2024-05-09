import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import PermissionDetails from '@/components/permission/PermissionDetails';

function PermissionDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view permission</Helmet>
			<PermissionDetails id={id as string} />
		</>
	);
}

export default withLayout(PermissionDetailsPage);
