import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import { useRouter } from 'next/router';
import React from 'react';
import StudentDetails from '@/components/base/students/StudentDetails';

function StudentDetailsPage() {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view student</Helmet>
			<StudentDetails id={id} base="admin" />
		</>
	);
}

export default withLayout(StudentDetailsPage);
