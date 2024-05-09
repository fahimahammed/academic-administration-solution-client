import { TimePicker } from 'antd';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import APLabel from './FormLabel';
import dayjs from 'dayjs';
import { timeFormat } from '@/constants';

type FormTimePickerProps = {
	name: string;
	label?: string;
	index?: number;
};
export default function FormTimePicker({ name, label }: FormTimePickerProps) {
	const { control, setValue } = useFormContext();
	return (
		<>
			{label ? <APLabel noMargin={false}>{label}</APLabel> : null}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<TimePicker
						size="large"
						defaultValue={dayjs(field.value ? field.value : '00:00', timeFormat)}
						format={timeFormat}
						onChange={(el, value) => {
							setValue(name, value);
						}}
						style={{ width: '100%' }}
					/>
				)}
			/>
		</>
	);
}
