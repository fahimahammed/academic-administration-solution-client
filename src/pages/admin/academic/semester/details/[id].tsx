import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import SemesterDetails from '@/components/academic/semester/SemesterDetails';

function SemesterDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view semester</Helmet>
			<SemesterDetails id={id as string} />
		</>
	);
}

export default withLayout(SemesterDetailsPage);
