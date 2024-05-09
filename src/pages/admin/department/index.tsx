import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewDepartment from '@/components/base/department/ViewDepartment';

const ViewDepartmentPage: NextPage = () => {
	return (
		<>
			<Helmet>view department</Helmet>
			<ViewDepartment base="admin" />
		</>
	);
};

export default withLayout(ViewDepartmentPage);
