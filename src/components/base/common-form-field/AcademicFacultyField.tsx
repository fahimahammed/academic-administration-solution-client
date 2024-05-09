import { FormSelectField } from '@/components/forms';
import { useAcademicFacultiesQuery } from '@/redux/apis/academic/facultyApi';
import { SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type AcademicFacultyProps = {
	name: string;
	label: string;
};

export default function AcademicFacultyField({ name, label }: AcademicFacultyProps) {
	const { data, isLoading } = useAcademicFacultiesQuery({ limit: 100, page: 1 });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicFacultyOptions = data?.academicFaculties?.map(faculty => {
		return {
			label: faculty.title,
			value: faculty.id,
		};
	});

	return (
		<>
			<FormSelectField options={academicFacultyOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
