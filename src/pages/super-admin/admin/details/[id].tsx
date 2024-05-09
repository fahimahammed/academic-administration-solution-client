import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import AdminDetails from '@/components/base/admin/AdminDetails';

function AdminDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view admin</Helmet>
			<AdminDetails id={id} />
		</>
	);
}

export default withLayout(AdminDetailsPage);
