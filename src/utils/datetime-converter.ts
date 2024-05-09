import dayjs from 'dayjs';
export const formatDateTime = (date: string, format = 'MMM D, YYYY hh:mm A') => {
	return date && dayjs(date).format(format);
};
