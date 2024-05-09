import { DatePicker, DatePickerProps } from 'antd';
import { Dayjs } from 'dayjs';
import React from 'react';

type PHUDatePickerProps = {
	onChange?: (date: Dayjs | null, dateString: string) => void;
	size?: 'large' | 'small';
	value?: Dayjs;
};

function PHUDatePicker({ onChange, size = 'large', value }: PHUDatePickerProps) {
	const handleChange: DatePickerProps['onChange'] = (date, dateString) => {
		onChange ? onChange(date, dateString) : null;
	};
	return (
		<>
			<DatePicker onChange={handleChange} size={size} defaultValue={value} style={{ width: '100%' }} />
		</>
	);
}

export default PHUDatePicker;
