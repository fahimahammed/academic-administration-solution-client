import { FacultyPayload, UpdateMarkPayload } from '@/types';

export const parseFacultyRequestPayload = (metaData: FacultyPayload) => {
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

export const parsedFacultyUpdateRequestPayload = (metaData: FacultyPayload) => {
	const tempObject = { ...metaData };
	const parsedObject: FacultyPayload = { ...metaData };
	parsedObject['gender'] = tempObject['gender'] ? tempObject['gender'] : '';
	parsedObject['bloodGroup'] = tempObject['bloodGroup'] ? tempObject['bloodGroup'] : '';
	return parsedObject;
};

export const updateStudentMarkRequestPayload = (metaData: UpdateMarkPayload) => {
	const tempObject = { ...metaData };
	let parsedObject: UpdateMarkPayload = { ...tempObject };
	parsedObject['marks'] = Number(tempObject['marks']);
	return parsedObject;
};
