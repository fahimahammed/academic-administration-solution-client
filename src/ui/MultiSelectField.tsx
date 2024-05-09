import { SelectOption } from '@/types';
import { Select } from 'antd';
import React from 'react';

type MultiSelectFieldProps = {
	handleChange?: (el: string[]) => void;
	options: SelectOption[];
	defaultValue?: string[];
	onSearch: (el: any) => void;
	loading?: boolean;
	onClear?: () => void;
	onSelect?: (el: string, option: SelectOption) => void;
};

function MultiSelectField({ handleChange, options, defaultValue, onSearch, onClear, onSelect }: MultiSelectFieldProps) {
	return (
		<>
			<Select
				size="large"
				mode="multiple"
				allowClear
				onSearch={onSearch}
				style={{ width: '100%' }}
				placeholder="Please select"
				value={defaultValue}
				onChange={handleChange}
				options={options}
				onSelect={onSelect}
				onClear={onClear}
				filterOption={(inputValue, option: any) => {
					return option;
				}}
			/>
		</>
	);
}

export default MultiSelectField;
