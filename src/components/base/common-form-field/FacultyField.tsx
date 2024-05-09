import { FormSelectField } from '@/components/forms';
import { useCoreFacultiesQuery } from '@/redux/apis/base-admin/faculty/coreFacultyApi';
import { QueryParamsType, SelectOption } from '@/types';
import { ICoreFaculty } from '@/types/academic/faculty';
import { Spin } from 'antd';
import React from 'react';

type FacultyFieldProps = {
	name: string;
	label: string;
	query?: Record<string, QueryParamsType>;
};

export default function FacultyField({ name, label, query }: FacultyFieldProps) {
	const { data, isLoading } = useCoreFacultiesQuery({ ...query });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const facultyOptions = data?.coreFaculties?.map((el: ICoreFaculty) => {
		return {
			label: `${el.firstName} ${el.lastName} ${el.middleName}`,
			value: el.id,
		};
	});

	return (
		<>
			<FormSelectField options={facultyOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
