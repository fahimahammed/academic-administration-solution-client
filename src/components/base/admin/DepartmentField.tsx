import { FormSelectField } from '@/components/forms';
import { useDepartmentsQuery } from '@/redux/apis/departmentApi';
import { SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type DepartmentFieldProps = {
	name: string;
	label: string;
};

export default function DepartmentField({ name, label }: DepartmentFieldProps) {
	const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const departmentOptions = data?.departments?.map(department => {
		return {
			label: department.title,
			value: department.id,
		};
	});

	return (
		<>
			<FormSelectField options={departmentOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
