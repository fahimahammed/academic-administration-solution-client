import { IAcademicCoreSemester } from './academic/semester';
import { ICourse } from './course';
import { IOfferedCourseSection } from './offered-course-section';

export interface ISemesterRegistration {
	id: string;
	startDate: string;
	endDate: string;
	status: string;
	maxCredit: number;
	minCredit: number;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	academicSemesterId: string;
	academicSemester?: IAcademicCoreSemester;
}

export interface SemesterRegistrationPayload {
	startDate: string;
	endDate: string;
	academicSemesterId: string;
	minCredit: number;
	maxCredit: number;
}

export interface IGetMyCourseRegistration {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	courseId: string;
	semesterRegistrationId: string;
	academicDepartmentId: string;
	course: ICourse;
	offeredCourseSections?: IOfferedCourseSection[] | null;
	isTaken: boolean;
}
