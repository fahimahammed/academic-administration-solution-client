import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import EditFaculty from '@/components/academic/faculty/EditFaculty';

function EditFacultyPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit academic faculty</Helmet>
			<EditFaculty id={id as string} />
		</>
	);
}

export default withLayout(EditFacultyPage);
