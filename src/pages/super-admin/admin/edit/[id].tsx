import { Helmet } from '@/components';
import EditAdmin from '@/components/base/admin/EditAdmin';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';

function AdminEditPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit admin</Helmet>
			<EditAdmin id={id} />
		</>
	);
}

export default withLayout(AdminEditPage);
