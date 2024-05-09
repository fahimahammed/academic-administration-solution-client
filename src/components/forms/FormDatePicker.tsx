import DatePicker from '@/ui/DatePicker';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormLabel } from '.';
import dayjs, { Dayjs } from 'dayjs';
import { getErrorMessageByProperty } from '@/utils/schema-validation';
import { red } from '@ant-design/colors';

function FormDatePicker({ name, label }: { name: string; label?: string }) {
	const {
		control,
		setValue,
		formState: { errors },
	} = useFormContext();
	const errorMessages = getErrorMessageByProperty(errors, name);
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
							value={dayjs(field.value) || ''}
							onChange={(valOne: Dayjs | null, valTwo: string) => {
								setValue(name, valTwo);
							}}
						/>
					);
				}}
			/>
			<small style={{ color: red.primary }}>{errorMessages}</small>
		</>
	);
}

export default FormDatePicker;
