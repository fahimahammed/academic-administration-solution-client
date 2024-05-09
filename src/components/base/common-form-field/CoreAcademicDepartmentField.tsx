import { FormSelectField } from '@/components/forms';
import { useCoreAcademicDepartmentsQuery } from '@/redux/apis/academic/coreAcademicDepartmentApi';
import { SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type AcademicDepartmentProps = {
	name: string;
	label: string;
};

export default function CoreAcademicDepartmentField({ name, label }: AcademicDepartmentProps) {
	const { data, isLoading } = useCoreAcademicDepartmentsQuery({});

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
			<FormSelectField options={academicDepartmentOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
