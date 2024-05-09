import { IAcademicSemesterPayload } from '@/types/academic/semester';

export const parsedSemesterRequestPayload = (metaData: IAcademicSemesterPayload) => {
	const tempObject = { ...metaData };
	tempObject['year'] = Number(tempObject.year);
	return tempObject;
};
