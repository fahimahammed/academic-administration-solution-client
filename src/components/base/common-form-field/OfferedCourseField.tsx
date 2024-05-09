import { FormSelectField } from '@/components/forms';
import { useOfferedCoursesQuery } from '@/redux/apis/offeredCourseApi';
import { QueryParamsType, SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type CourseFieldProps = {
	name: string;
	label: string;
	query?: Record<string, QueryParamsType>;
};

export default function OfferedCourseField({ name, label, query }: CourseFieldProps) {
	const { data, isLoading } = useOfferedCoursesQuery({
		limit: 1000,
		page: 1,
		...query,
	});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const offeredCourseOptions = data?.offeredCourses.map(offeredCourse => {
		return {
			label: offeredCourse?.course?.title,
			value: offeredCourse?.id,
		};
	});

	return (
		<>
			<FormSelectField options={offeredCourseOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
