import { logger } from '@/services';
import { useAddStudentWithFormDataMutation } from '@/redux/apis/base-admin/student/studentApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { StudentSchema } from '@/schemas';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { parseStudentRequestPayload } from '@/transformer';
import { CreateEntityWithFormData, IError, StudentPayload } from '@/types';
import StepperComponent from '@/components/stepperform';
import StudentInfo from './create-student-form/StudentInfo';
import BasicInfo from './create-student-form/BasicInfo';
import GuardianInfo from './create-student-form/GuardianInfo';
import LocalGuardianInfo from './create-student-form/LocalGuardianInfo';
import { studentCreateForm } from '@/constants';

const CreateStudent = ({ base }: { base?: string }) => {
	const [addStudentWithFormData] = useAddStudentWithFormDataMutation();

	const studentOnSubmit = async (values: StudentPayload) => {
		const value: CreateEntityWithFormData = parseStudentRequestPayload(values);
		const formData = new FormData();
		formData.append('file', value?.file as Blob);
		formData.append('data', value.data);

		try {
			await addStudentWithFormData(formData).unwrap();
			notifySuccess('Student created successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const formSteps = [
		{
			title: 'Student information',
			content: <StudentInfo />,
		},
		{
			title: 'Basic information',
			content: <BasicInfo />,
		},
		{
			title: 'Guardian information',
			content: <GuardianInfo />,
		},
		{
			title: 'Local guardian information',
			content: <LocalGuardianInfo />,
		},
	];

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `${base}`, link: `/${base}` },
					{ label: 'student', link: `/${base}/student` },
				]}
			/>
			<ActionBar title="Create Student"></ActionBar>

			<StepperComponent
				steps={formSteps}
				persistKeyName={studentCreateForm}
				validationSchema={StudentSchema}
				onSubmitHandler={value => {
					studentOnSubmit(value);
				}}
			/>
		</>
	);
};

export default CreateStudent;
