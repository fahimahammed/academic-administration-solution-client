import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import CreateDepartment from '@/components/academic/department/CreateDepartment';

const CreateAcademicDepartmentPage: NextPage = () => {
	return (
		<>
			<Helmet>create academic departments</Helmet>
			<CreateDepartment />
		</>
	);
};

export default withLayout(CreateAcademicDepartmentPage);
