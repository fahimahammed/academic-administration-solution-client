import { RcFile } from 'antd/es/upload';
import { Name } from './common';
import { ICourse } from './course';
import { IOfferedCourse } from './offered-course';
import { IOfferedCourseSection } from './offered-course-section';
import { IAcademicCoreFaculty } from './academic/faculty';
import { IAcademicCoreSemester, IAcademicSemester } from './academic/semester';
import { IAcademicCoreDepartment } from './academic/department';

export interface IStudent {
	id: string;
	name: Name & { id: string };
	dateOfBirth: string;
	gender: string;
	bloodGroup: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	presentAddress: string;
	permanentAddress: string;
	guardian: Guardian & { id: string };
	localGuardian: LocalGuardian & { id: string };
	department: string;
	subject: string;
	createdAt: string;
	updatedAt: string;
}

export interface Guardian {
	fatherName: string;
	fatherOccupation: string;
	fatherContactNo: string;
	motherName: string;
	motherOccupation: string;
	motherContactNo: string;
	address: string;
}
export interface LocalGuardian {
	name: string;
	occupation: string;
	contactNo: string;
	address: string;
}

export interface IStudentRequestPayload {
	password: string;
	student: StudentPayload;
}

export interface StudentPayload {
	name: Name;
	dateOfBirth: string;
	gender: string;
	bloodGroup: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	presentAddress: string;
	permanentAddress: string;
	academicFaculty: string;
	academicDepartment: string;
	academicSemester: string;
	department: string;
	subject: string;
	guardian: Guardian;
	localGuardian: LocalGuardian;
	file?: RcFile;
}

export interface IMyCourse {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	studentId: string;
	courseId: string;
	academicSemesterId: string;
	grade?: null;
	point: number;
	totalMarks: number;
	status: string;
	course: ICourse;
}

export interface IMyCourseSchedule {
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	semesterRegistrationId: string;
	studentId: string;
	offeredCourseId: string;
	offeredCourseSectionId: string;
	offeredCourse: IOfferedCourse;
	offeredCourseSection: IOfferedCourseSection;
}

export interface ICoreStudent {
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
	academicFaculty: IAcademicCoreFaculty;
	academicDepartment: IAcademicCoreDepartment;
	academicSemester: IAcademicCoreSemester;
}

export interface IStudentEnrolledCourse {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	studentId: string;
	courseId: string;
	academicSemesterId: string;
	grade?: null;
	point: number;
	totalMarks: number;
	status: string;
	academicSemester: IAcademicCoreSemester;
	student: ICoreStudent;
	course: ICourse;
}

export interface IStudentEnrolledCourseMark {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	studentId: string;
	studentEnrolledCourseId: string;
	academicSemesterId: string;
	grade?: null;
	marks: number;
	examType: string;
	academicSemester: IAcademicCoreSemester;
	student: ICoreStudent;
	studentEnrolledCourse: IStudentEnrolledCourse;
}

export interface IAcademicReport {
	academicInfo: AcademicInfo;
	courses?: CoursesEntity[] | null;
}
export interface AcademicInfo {
	id: string;
	createdAt: string;
	updatedAt: string;
	studentId: string;
	totalCompletedCredit: number;
	cgpa: number;
}
export interface CoursesEntity {
	academicSemester: IAcademicSemester;
	completedCourses?: CompletedCoursesEntity[] | null;
}

export interface CompletedCoursesEntity {
	id: string;
	createdAt: string;
	updatedAt: string;
	studentId: string;
	courseId: string;
	grade: string;
	point: number;
	totalMarks: number;
	status: string;
	course: ICourse;
}
//   export interface Course {
// 	id: string;
// 	title: string;
// 	code: string;
// 	credits: number;
// 	createdAt: string;
// 	updatedAt: string;
//   }
