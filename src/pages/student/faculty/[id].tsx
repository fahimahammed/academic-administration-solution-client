import { Helmet } from '@/components';
import FacultyInfo from '@/components/base/students/FacultyInfo';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';

function FacultyInfoPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>faculty info</Helmet>
			<FacultyInfo userId={id as string} />
		</>
	);
}

export default withLayout(FacultyInfoPage);
