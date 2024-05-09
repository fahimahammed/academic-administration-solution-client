import { FormSelectField } from '@/components/forms';
import { useAcademicDepartmentsQuery } from '@/redux/apis/academic/departmentApi';
import { SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type AcademicDepartmentFieldProps = {
	name: string;
	label: string;
};

export default function AcademicDepartmentField({ name, label }: AcademicDepartmentFieldProps) {
	const { data, isLoading } = useAcademicDepartmentsQuery({ limit: 100, page: 1 });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicDepartmentOptions = data?.academicDepartments?.map(department => {
		return {
			label: department.title,
			value: department.id,
		};
	});

	return (
		<>
			<FormSelectField options={academicDepartmentOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
