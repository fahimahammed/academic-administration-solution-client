import { SelectOption } from '@/types';
import { AutoComplete } from 'antd';
import React from 'react';

type PHUAutoCompleteProps = {
	options: SelectOption[];
	placeholder?: string;
	value?: string;
	onSearch?: (el: string) => void;
	onSelect?: (el: string, option: SelectOption) => void;
};
function PHUAutoComplete({ options, placeholder = 'select', value, onSearch, onSelect }: PHUAutoCompleteProps) {
	return (
		<>
			<AutoComplete
				style={{
					width: '100%',
				}}
				options={options}
				onSelect={onSelect}
				onSearch={onSearch}
				placeholder={placeholder}
				value={value}
				filterOption={(inputValue, option: any) => {
					const optionValue = option.value || '';
					const optionLabel = option.label || '';
					const optionChildren = option.children || '';
					return (
						optionValue.includes(inputValue) ||
						optionLabel.includes(inputValue) ||
						optionChildren.includes(inputValue)
					);
				}}
			/>
		</>
	);
}

export default PHUAutoComplete;
