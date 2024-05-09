import { Helmet } from '@/components';
import EditDepartment from '@/components/academic/department/EditDepartment';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';

function DepartmentEditPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit department</Helmet>
			<EditDepartment id={id as string} />
		</>
	);
}

export default withLayout(DepartmentEditPage);
