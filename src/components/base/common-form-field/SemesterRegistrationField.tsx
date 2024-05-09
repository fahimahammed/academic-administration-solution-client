import { FormSelectField } from '@/components/forms';
import { useSemesterRegistrationsQuery } from '@/redux/apis/semesterRegistrationApi';
import { ISemesterRegistration, SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type SemesterRegistrationFieldProps = {
	name: string;
	label: string;
};

export default function SemesterRegistrationField({ name, label }: SemesterRegistrationFieldProps) {
	const { data, isLoading } = useSemesterRegistrationsQuery({});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const semesterRegistrationOptions = data?.semesterRegistrations?.map((semesterRegistration: ISemesterRegistration) => {
		return {
			label: semesterRegistration?.academicSemester?.title + `(${semesterRegistration?.academicSemester?.year})`,
			value: semesterRegistration.id,
		};
	});

	return (
		<>
			<FormSelectField options={semesterRegistrationOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
