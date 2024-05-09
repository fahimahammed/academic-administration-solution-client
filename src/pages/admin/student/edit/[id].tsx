import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { EditStudent } from '@/components/base/students';
import { useRouter } from 'next/router';
import React from 'react';

function StudentEditPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit student</Helmet>
			<EditStudent id={id} base="admin" />
		</>
	);
}

export default withLayout(StudentEditPage);
