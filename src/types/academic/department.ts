import { IAcademicFaculty } from './faculty';

export interface IAcademicDepartment {
	id: string;
	title: string;
	academicFaculty: IAcademicFaculty;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IAcademicCoreDepartment {
	id: string;
	syncId?: null;
	title: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	academicFacultyId: string;
}
