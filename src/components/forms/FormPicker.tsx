import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormLabel } from '.';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';

function FormPicker({ name, label, picker }: { name: string; label?: string; picker: 'year' | 'time' }) {
	const { control } = useFormContext();
	return (
		<>
			<FormLabel noMargin={false}>{label || name}</FormLabel>
			<br />
			<Controller
				name={name}
				control={control}
				render={({ field }) => {
					return (
						<DatePicker
							style={{ width: '100%' }}
							defaultValue={field.value}
							value={field.value ? dayjs().year(field.value) : null}
							picker={picker}
							size="large"
							onChange={(_, dateString) => {
								field.onChange(dateString);
							}}
						/>
					);
				}}
			/>
		</>
	);
}

export default FormPicker;
