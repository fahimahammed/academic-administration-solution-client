import { AdminPayload } from '@/types';

export const parseAdminRequestPayload = (metaData: AdminPayload) => {
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

export const parsedAdminUpdateRequestPayload = (metaData: AdminPayload) => {
	const tempObject = { ...metaData };
	const parsedObject = { ...metaData };
	parsedObject['gender'] = tempObject['gender'] || '';
	parsedObject['bloodGroup'] = tempObject['bloodGroup'] || '';
	return parsedObject;
};
