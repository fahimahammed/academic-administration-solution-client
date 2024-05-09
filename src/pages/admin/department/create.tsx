import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateDepartment from '@/components/base/department/CreateDepartment';

const CreateDepartmentPage: NextPage = () => {
	return (
		<>
			<Helmet>create department</Helmet>
			<CreateDepartment base="admin" />
		</>
	);
};

export default withLayout(CreateDepartmentPage);
