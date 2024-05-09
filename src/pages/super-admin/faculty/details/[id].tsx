import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import FacultyDetails from '@/components/base/faculty/FacultyDetails';

function FacultyDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view faculty</Helmet>
			<FacultyDetails id={id} base="super-admin" />
		</>
	);
}

export default withLayout(FacultyDetailsPage);
