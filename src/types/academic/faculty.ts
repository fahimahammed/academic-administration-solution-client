import { IAcademicCoreDepartment } from './department';

export interface IAcademicFaculty {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IAcademicCoreFaculty {
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

export interface ICoreFaculty {
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
	academicFaculty: IAcademicCoreFaculty;
	academicDepartment: IAcademicCoreDepartment;
}
