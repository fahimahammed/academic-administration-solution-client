import { RcFile } from 'antd/es/upload';
import { IBaseUser } from './common';
import { ICourse } from './course';
import { IOfferedCourseSection } from './offered-course-section';
import { IOfferedCourseSchedule } from './offered-course-schedule';

export interface IFaculty extends IBaseUser {
	id: string;
	designation: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IFacultyRequestPayload {
	password: string;
	faculty: FacultyPayload;
}
export interface FacultyPayload extends IBaseUser {
	designation: string;
	file?: RcFile;
}

export interface IFacultyCourse {
	course: ICourse;
	sections?: SectionsEntity[] | null;
}

export interface SectionsEntity {
	section: IOfferedCourseSection;
	classSchedules?: IOfferedCourseSchedule[] | null;
}

export interface IFacultyCourseStudent {
	id: string;
	studentId: string;
	firstName: string;
	lastName: string;
	middleName: string;
	profileImage: string;
	email: string;
	contactNo: string;
	gender: string;
	bloodGroup: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	academicSemesterId: string;
	academicDepartmentId: string;
	academicFacultyId: string;
}

export type UpdateMarkPayload = {
	marks: number;
	courseId: string;
	academicSemesterId: string;
	studentId: string;
	examType: string;
};
