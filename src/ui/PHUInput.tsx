import React from 'react';
import { Input } from 'antd';
import { FieldValue } from 'react-hook-form';

type InputBoxProps = {
	type?: string | undefined;
	size?: 'large' | 'small';
	placeholder: string;
	field?: FieldValue<any>;
	value: string;
};

const PHUInput = ({ type, size = 'large', placeholder, field, value }: InputBoxProps) => {
	return (
		<>
			<Input type={type} size={size} placeholder={placeholder} {...field} value={value} />
		</>
	);
};

export default PHUInput;
