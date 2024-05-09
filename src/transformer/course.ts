import { CoursePayload, QueryParamsType } from '@/types';

export const parseCourseCreatePayload = (metaData: CoursePayload) => {
	const tempObject = { ...metaData };
	const parsedObject: Record<string, QueryParamsType> = {};
	parsedObject['title'] = tempObject.title;
	parsedObject['code'] = tempObject.code;
	parsedObject['credits'] = Number(tempObject['credits']);
	tempObject?.coursePreRequisites ? (parsedObject['coursePreRequisites'] = tempObject?.coursePreRequisites) : null;
	return parsedObject;
};
