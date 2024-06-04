import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewDepartments from '@/components/academic/department/ViewDepartments';

const AcademicDepartmentPage: NextPage = () => {
	return (
		<>
			<Helmet>Academic Department</Helmet>
			<ViewDepartments />
		</>
	);
};

export default withLayout(AcademicDepartmentPage);
