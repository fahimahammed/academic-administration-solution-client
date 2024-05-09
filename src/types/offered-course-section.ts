import { IOfferedCourse } from './offered-course';
import { IOfferedCourseSchedule } from './offered-course-schedule';

export interface IOfferedCourseSection {
	id: string;
	title: string;
	maxCapacity: number;
	currentlyEnrolledStudent: number;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	offeredCourseId: string;
	offeredCourse: IOfferedCourse;
	offeredCourseClassSchedules?: IOfferedCourseSchedule[] | null;
	isTaken?: boolean;
}
export interface OfferedCourse {
	id: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	courseId: string;
	semesterRegistrationId: string;
	academicDepartmentId: string;
	course: Course;
}
export interface Course {
	id: string;
	title: string;
	code: string;
	credits: number;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
}
export interface OfferedCourseClassSchedulesEntity {
	id: string;
	dayOfWeek: string;
	startTime: string;
	endTime: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	offeredCourseSectionId: string;
	roomId: string;
	facultyId: string;
	room: Room;
	faculty: Faculty;
}
export interface Room {
	id: string;
	roomNumber: string;
	floor: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	buildingId: string;
	building: Building;
}
export interface Building {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
}
export interface Faculty {
	id: string;
	facultyId: string;
	firstName: string;
	lastName: string;
	middleName: string;
	profileImage: string;
	email: string;
	contactNo: string;
	gender: string;
	bloodGroup: string;
	designation: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	academicDepartmentId: string;
	academicFacultyId: string;
}

export interface OfferedCourseSectionPayload {
	offeredCourseId: string;
	maxCapacity: number;
	title: string;
	classSchedules?: ClassSchedulesEntity[] | null;
}
export interface ClassSchedulesEntity {
	dayOfWeek: string;
	startTime: string;
	endTime: string;
	roomId: string;
	facultyId: string;
}
