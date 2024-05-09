import { SemesterRegistrationPayload } from '@/types';
import dayjs from 'dayjs';

export const parseSemesterRegistrationRequestPayload = (metaData: SemesterRegistrationPayload) => {
	const tempObject = { ...metaData };
	tempObject['startDate'] = dayjs(tempObject['startDate']).toISOString();
	tempObject['endDate'] = dayjs(tempObject['endDate']).toISOString();
	tempObject['minCredit'] = Number(tempObject['minCredit']);
	tempObject['maxCredit'] = Number(tempObject['maxCredit']);
	return tempObject;
};
