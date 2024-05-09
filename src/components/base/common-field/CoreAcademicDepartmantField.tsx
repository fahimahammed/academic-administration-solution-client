import { useCoreAcademicDepartmentsQuery } from '@/redux/apis/academic/coreAcademicDepartmentApi';
import { QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';

type CoreAcademicDepartmentProps = {
	value?: string;
	label?: string;
	query?: Record<string, QueryParamsType>;
	onChange: (el: string) => void;
	placeholder?: string;
};

export default function CoreAcademicDepartmentField({
	value,
	label,
	query,
	onChange,
	placeholder = 'select',
}: CoreAcademicDepartmentProps) {
	const { data, isLoading } = useCoreAcademicDepartmentsQuery({ ...query });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicDepartmentOptions = data?.coreAcademicDepartments?.map(department => {
		return {
			label: department.title,
			value: department.id,
		};
	});

	return (
		<>
			{label && <label style={{ textTransform: 'capitalize' }}>{label}</label>}
			<SelectField
				value={value}
				options={academicDepartmentOptions as SelectOption[]}
				handleChange={(el: string) => {
					onChange(el);
				}}
				placeholder={placeholder}
			/>
		</>
	);
}
