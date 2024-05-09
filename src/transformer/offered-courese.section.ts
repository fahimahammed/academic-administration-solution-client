import { ClassSchedulesEntity, OfferedCourseSectionPayload } from '@/types/offered-course-section';

export const parseOfferedCourseSectionRequestPayload = (metaData: OfferedCourseSectionPayload) => {
	const tempData = { ...metaData };
	tempData['maxCapacity'] = Number(tempData['maxCapacity']);
	tempData['classSchedules'] =
		tempData['classSchedules'] &&
		tempData['classSchedules'].map((el: ClassSchedulesEntity) => {
			return {
				...el,
				dayOfWeek: el.dayOfWeek.toUpperCase(),
			};
		});
	return tempData;
};
