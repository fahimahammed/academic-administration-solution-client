import { Select } from 'antd';
import React from 'react';

type SelectFieldProps = {
	handleChange: (value: string) => void;
	options: {
		value: string;
		label: string;
	}[];
	size?: 'large' | 'small';
	value?: string;
	placeholder?: string;
	disabled?: boolean;
};

function SelectField({
	handleChange,
	options,
	value,
	size = 'large',
	placeholder = 'select',
	disabled = false,
}: SelectFieldProps) {
	return (
		<Select
			size={size}
			value={value}
			style={{ width: '100%' }}
			onChange={handleChange}
			options={options}
			placeholder={placeholder}
			disabled={disabled}
		/>
	);
}

export default SelectField;
