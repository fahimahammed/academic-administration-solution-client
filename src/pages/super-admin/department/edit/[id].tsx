import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import { useRouter } from 'next/router';
import EditDepartment from '@/components/base/department/EditDepartment';

const EditDepartmentPage: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	return (
		<>
			<Helmet>edit department</Helmet>
			<EditDepartment id={id as string} base="super-admin" />
		</>
	);
};

export default withLayout(EditDepartmentPage);
