import * as yup from 'yup';

const SemesterRegistrationSchema = yup.object().shape({
	startDate: yup.string().required('start date is required'),
	endDate: yup.string().required('end date is required'),
	academicSemesterId: yup.string().required('academic semeter is required'),
	minCredit: yup.string().required('mic credit is required'),
	maxCredit: yup.string().required('max credit is required'),
});

export { SemesterRegistrationSchema };
