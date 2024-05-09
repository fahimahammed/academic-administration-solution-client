import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import AcademicReport from '@/components/base/students/AcademicReport';

const StudentAcademicReportPage: NextPage = () => {
	return (
		<>
			<Helmet>student academic report</Helmet>
			<AcademicReport />
		</>
	);
};

export default withLayout(StudentAcademicReportPage);
