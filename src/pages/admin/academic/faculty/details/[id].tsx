import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import FacultyDetails from '@/components/academic/faculty/FacultyDetails';

function FacultyDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view academic faculty</Helmet>
			<FacultyDetails id={id as string} />
		</>
	);
}

export default withLayout(FacultyDetailsPage);
