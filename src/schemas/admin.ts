import * as yup from 'yup';

const AdminSchema = yup.object().shape({
	admin: yup.object().shape({
		name: yup.object().shape({
			firstName: yup.string().required('first name required'),
			middleName: yup.string().required('middle name name required'),
			lastName: yup.string().required('last name name required'),
		}),
		email: yup.string().email().required('email is required'),
		designation: yup.string().required('designation is required'),
		contactNo: yup.string().required('contact number is required'),
		dateOfBirth: yup.string().required('DOB is required'),
	}),
	password: yup.string().min(6).max(32).required(),
});

export { AdminSchema };
