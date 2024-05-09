import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import StudentPreRegistration from '@/components/semester-registration/StudentPreRegistration';
import { useMyRegistrationQuery } from '@/redux/apis/semesterRegistrationApi';
import { Spinner } from '@/ui';

const StudentCoursePreRegistrationPage: NextPage = () => {
	const { data, isLoading } = useMyRegistrationQuery({});
	if (isLoading) return <Spinner />;

	return (
		<>
			<Helmet>student pre-registration</Helmet>
			{data?.studentSemesterRegistration?.isConfirmed ? (
				<div>
					<h3>registration not allowed</h3>
					<p>you have already completed your registration</p>
				</div>
			) : (
				<StudentPreRegistration />
			)}
		</>
	);
};

export default withLayout(StudentCoursePreRegistrationPage);
