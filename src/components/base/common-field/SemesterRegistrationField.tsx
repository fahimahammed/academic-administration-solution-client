import { useSemesterRegistrationsQuery } from '@/redux/apis/semesterRegistrationApi';
import { ISemesterRegistration, QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';

type SemesterRegistrationFieldProps = {
	label?: string;
	query?: Record<string, QueryParamsType>;
	onChange: (el: string) => void;
	placeholder?: string;
};

export default function SemesterRegistrationField({ label, query, onChange, placeholder }: SemesterRegistrationFieldProps) {
	const { data, isLoading } = useSemesterRegistrationsQuery({ ...query });

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
			{label && <label style={{ textTransform: 'capitalize' }}>{label}</label>}
			<SelectField
				options={semesterRegistrationOptions as SelectOption[]}
				handleChange={(el: string) => {
					onChange(el);
				}}
				placeholder={placeholder}
			/>
		</>
	);
}
