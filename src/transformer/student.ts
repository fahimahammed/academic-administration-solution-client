import { StudentPayload } from '@/types';

export const parseStudentRequestPayload = (metaData: StudentPayload) => {
	const tempObject = { ...metaData };
	const file = tempObject['file'];
	delete tempObject['file'];
	const data = tempObject;
	const parsedObject = {
		file,
		data: JSON.stringify(data),
	};
	return parsedObject;
};

export const parsedStudentUpdateRequestPayload = (metaData: StudentPayload) => {
	const tempObject = { ...metaData };
	const parsedObject: StudentPayload = { ...metaData };
	parsedObject['gender'] = tempObject['gender'] ? tempObject['gender'] : '';
	parsedObject['bloodGroup'] = tempObject['bloodGroup'] ? tempObject['bloodGroup'] : '';
	return parsedObject;
};
