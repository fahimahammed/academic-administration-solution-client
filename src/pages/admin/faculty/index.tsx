import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewFaculties from '@/components/base/faculty/ViewFaculties';

const ViewFacultyPage: NextPage = () => {
	return (
		<>
			<Helmet>view faculties</Helmet>
			<ViewFaculties base="admin" />
		</>
	);
};

export default withLayout(ViewFacultyPage);
