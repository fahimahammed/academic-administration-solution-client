import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import PreRegistration from '@/components/base/students/PreRegistration';

const StudentCourseRegistrationPage: NextPage = () => {
	return (
		<>
			<Helmet>student pre-registration</Helmet>
			<PreRegistration />
		</>
	);
};

export default withLayout(StudentCourseRegistrationPage);
