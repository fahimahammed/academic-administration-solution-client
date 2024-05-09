import * as yup from 'yup';

const StudentSchema = yup.object().shape({
	student: yup.object().shape({
		name: yup.object().shape({
			firstName: yup.string().required('first name required'),
			middleName: yup.string().required('middle name name required'),
		}),
		email: yup.string().email().required('email is required'),
		contactNo: yup.string().required('contact number is required'),
		dateOfBirth: yup.string().required('DOB is required'),

		guardian: yup.object().shape({
			fatherName: yup.string().required('father name required'),
			fatherOccupation: yup.string().required('father occupation required'),
			fatherContactNo: yup.string().required('father contact no. required'),
			motherName: yup.string().required('mother name required'),
			motherOccupation: yup.string().required('mother occupation required'),
			motherContactNo: yup.string().required('mother contact no. required'),
		}),
	}),
	password: yup.string().min(6).max(32).required(),
});

export { StudentSchema };
