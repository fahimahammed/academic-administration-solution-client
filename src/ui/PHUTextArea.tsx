import React from 'react';
import { Input } from 'antd';
import { FieldValue } from 'react-hook-form';

type InputBoxProps = {
	placeholder?: string;
	field?: FieldValue<any>;
	value: string;
	rows?: number;
};

const PHUTextArea = ({ placeholder, field, value, rows }: InputBoxProps) => {
	return (
		<>
			<Input.TextArea rows={rows} placeholder={placeholder} {...field} defaultValue={value} />
		</>
	);
};

export default PHUTextArea;
