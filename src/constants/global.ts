export const DEBOUNCE_DELAY = 600;
export const DOTS = -1;
export const defaultTablePageSize = [10, 20, 50, 100] as number[];

export enum USER_ROLE {
	ADMIN = 'admin',
	SUPER_ADMIN = 'super_admin',
	STUDENT = 'student',
	FACULTY = 'faculty',
}

export enum START_BASE_ROUTES {
	ADMIN = '/admin',
	SUPER_ADMIN = '/super-admin',
	STUDENT = '/student',
	FACULTY = '/faculty',
}

export enum COMMON_ROUTES {
	NOT_ALLOWED = '/not-allowed',
	LOGIN = '/login',
	CHANGE_PASSWORD = '/change-password',
}

export const genderOptions = [
	{
		label: 'Male',
		value: 'male',
	},
	{
		label: 'Female',
		value: 'female',
	},
	{
		label: 'Other',
		value: 'other',
	},
];

export const bloodGroupOptions = [
	{
		label: 'A+',
		value: 'A+',
	},
	{
		label: 'A-',
		value: 'A-',
	},
	{
		label: 'B+',
		value: 'B+',
	},
	{
		label: 'B-',
		value: 'B-',
	},
	{
		label: 'AB+',
		value: 'AB+',
	},
	{
		label: 'AB-',
		value: 'AB-',
	},
	{
		label: 'O+',
		value: 'O+',
	},
	{
		label: 'O-',
		value: 'O-',
	},
];

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const timeFormat = 'HH:mm';

export const monthOptions = months.map((month: string) => {
	return {
		label: month,
		value: month,
	};
});

export const dayOptions = days.map((day: string) => {
	return {
		label: day,
		value: day.toUpperCase(),
	};
});

export const semesterRegistrationStatus = ['UPCOMING', 'ONGOING', 'ENDED'];
export enum PaymentType {
	PARTIAL = 'PARTIAL',
	FULL = 'FULL',
}
export enum PaymentStatus {
	PENDING = 'PENDING',
	PAID = 'PAID',
	PARTIAL_PAID = 'PARTIAL_PAID',
	FULL_PAID = 'FULL_PAID',
}

export enum ExamType {
	FINAL = 'FINAL',
	MIDTERM = 'MIDTERM',
}
