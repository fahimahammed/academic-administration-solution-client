import { IAcademicCoreDepartment } from './academic/department';
import { ICourse } from './course';
import { ISemesterRegistration } from './semester-registration';

export interface IOfferedCourse {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	courseId: string;
	semesterRegistrationId: string;
	academicDepartmentId: string;
	semesterRegistration: ISemesterRegistration;
	course: ICourse;
	academicDepartment: IAcademicCoreDepartment;
}
