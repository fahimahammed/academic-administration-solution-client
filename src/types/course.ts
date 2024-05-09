export interface ICourse {
	id: string;
	title: string;
	code: string;
	credits: number;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	prerequisites?: null[] | null;
	prerequisiteFor?: null[] | null;
}

export interface CoursePayload {
	title: string;
	code: string;
	credits: number;
	coursePreRequisites?: CoursePreRequisitesEntity[] | null;
	courseIds?: string[] | undefined;
}
export interface CoursePreRequisitesEntity {
	courseId: string;
}

export interface Prerequisite {
	id: string;
	title: string;
	code: string;
	credits: number;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
}

export type CourseUpdatePayload = {
	courseId: string;
	isDeleted?: boolean;
};

export interface IPreRequisite extends CoursePreRequisitesEntity {
	prerequisiteId: string;
	prerequisite: Prerequisite;
	isNew?: boolean;
}
