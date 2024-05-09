import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import EditFaculty from '@/components/base/faculty/EditFaculty';

function FacultyEditPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit faculty</Helmet>
			<EditFaculty id={id} base="admin" />
		</>
	);
}

export default withLayout(FacultyEditPage);
