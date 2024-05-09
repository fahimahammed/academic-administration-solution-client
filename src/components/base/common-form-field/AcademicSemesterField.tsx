import { FormSelectField } from '@/components/forms';
import { useAcademicSemestersQuery } from '@/redux/apis/academic/semesterApi';
import { SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type AcademicSemesterProps = {
	name: string;
	label: string;
};

export default function AcademicSemesterField({ name, label }: AcademicSemesterProps) {
	const { data, isLoading } = useAcademicSemestersQuery({ limit: 100, page: 1 });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicSemesterOptions = data?.academicSemesters?.map(semester => {
		return {
			label: semester.title,
			value: semester.id,
		};
	});

	return (
		<>
			<FormSelectField options={academicSemesterOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
