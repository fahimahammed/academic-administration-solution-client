import { MultiSelectField } from '@/ui';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormLabel } from '.';
import { SelectOption } from '@/types';

type FormMultiSelectFieldProps = {
	name: string;
	loading: boolean;
	label?: string;
	options: SelectOption[];
	handleOnChange?: (el: string[]) => void;
	onSearch: (el: string) => void;
	onClear?: () => void;
	onSelect?: (el: string, option: SelectOption) => void;
};

export default function FormMultiSelectField({
	name,
	loading,
	onSearch,
	label,
	handleOnChange,
	options,
	onClear,
	onSelect,
}: FormMultiSelectFieldProps) {
	const { control } = useFormContext();

	return (
		<>
			<FormLabel noMargin={false}>{label || name}</FormLabel>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => {
					return (
						<MultiSelectField
							options={options}
							onSearch={onSearch}
							handleChange={(el: string[]) => {
								const data = handleOnChange ? handleOnChange(el) : null;
								onChange(data);
							}}
							defaultValue={value}
							loading={loading}
							onClear={onClear}
							onSelect={onSelect}
						/>
					);
				}}
			/>
		</>
	);
}
