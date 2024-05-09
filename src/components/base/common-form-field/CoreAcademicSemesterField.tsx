import { FormSelectField } from '@/components/forms';
import { useCoreAcademicSemestersQuery } from '@/redux/apis/academic/coreAcademicSemesterApi';
import { SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type CoreAcademicSemeterProps = {
	name: string;
	label: string;
};

export default function CoreAcademicSemesterField({ name, label }: CoreAcademicSemeterProps) {
	const { data, isLoading } = useCoreAcademicSemestersQuery({});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicSemesterOptions = data?.coreAcademicSemesters?.map(semester => {
		return {
			label: `${semester.title}(${semester.year})`,
			value: semester.id,
		};
	});

	return (
		<>
			<FormSelectField options={academicSemesterOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
