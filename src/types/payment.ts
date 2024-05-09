import { IAcademicCoreSemester } from './academic/semester';
import { ICoreStudent } from './student';

export interface IMyPayment {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	studentId: string;
	academicSemesterId: string;
	fullPaymentAmount: number;
	partialPaymentAmount: number;
	totalPaidAmount: number;
	totalDueAmount: number;
	paymentStatus: string;
	academicSemester: IAcademicCoreSemester;
	student: ICoreStudent;
}
