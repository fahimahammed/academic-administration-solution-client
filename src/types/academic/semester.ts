export interface IAcademicSemesterPayload {
	title: string;
	code: string;
	startMonth: string;
	endMonth: string;
	year: number;
}

export interface IAcademicSemester {
	id: string;
	title: string;
	year: number;
	code: string;
	startMonth: string;
	endMonth: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IAcademicCoreSemester {
	id: string;
	syncId?: null;
	title: string;
	code: string;
	year: number;
	isCurrent?: boolean;
	startMonth: string;
	endMonth: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
}
