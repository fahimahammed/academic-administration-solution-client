import { IAcademicCoreFaculty } from './academic/faculty';
import { IOfferedCourseSection } from './offered-course-section';
import { IRoom } from './room';

export interface IOfferedCourseSchedule {
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
	offeredCourseSection: IOfferedCourseSection;
	faculty: IAcademicCoreFaculty;
	room: IRoom;
}
