import { Input } from 'antd';
import React from 'react';
type SearchInputProps = {
	placeholder?: string;
	className?: string;
	onChange?: (el: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string;
};
function SearchInput({ placeholder = 'search', onChange, value }: SearchInputProps) {
	return (
		<>
			<Input
				size="large"
				type="search"
				placeholder={placeholder}
				style={{ width: '15%' }}
				onChange={onChange}
				value={value}
			/>
		</>
	);
}

export default SearchInput;
