import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import DepartmentDetails from '@/components/academic/department/DepartmentDetails';

function DepartmentDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view department</Helmet>
			<DepartmentDetails id={id as string} />
		</>
	);
}

export default withLayout(DepartmentDetailsPage);
