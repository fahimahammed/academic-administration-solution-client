import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import DepartmentDetails from '@/components/base/department/DepartmentDetails';

const EditDepartmentPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>view department</Helmet>
			<DepartmentDetails id={id as string} base="admin" />
		</>
	);
};

export default withLayout(EditDepartmentPage);
