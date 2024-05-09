import { FormSelectField } from '@/components/forms';
import { useCoursesQuery } from '@/redux/apis/courseApi';
import { ICourse, SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type CourseFieldProps = {
	name: string;
	label: string;
};

export default function CourseField({ name, label }: CourseFieldProps) {
	const { data, isLoading } = useCoursesQuery({});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const courseOptions = data?.courses.map((course: ICourse) => {
		return {
			label: course?.title,
			value: course?.id,
		};
	});

	return (
		<>
			<FormSelectField options={courseOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
