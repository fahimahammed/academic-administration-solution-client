import { FormSelectField } from '@/components/forms';
import { useOfferedCourseSectionsQuery } from '@/redux/apis/offerdCourseSectionApi';
import { IOfferedCourseSection, SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type OfferedCourseSectionFieldProps = {
	name: string;
	label: string;
};

export default function OfferedCourseSectionField({ name, label }: OfferedCourseSectionFieldProps) {
	const { data, isLoading } = useOfferedCourseSectionsQuery({});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const offeredCourseSectionOption = data?.offeredCourseSections.map((el: IOfferedCourseSection) => {
		return {
			label: `${el.offeredCourse.course.title} (${el.title})`,
			value: el.id,
		};
	});

	return (
		<>
			<FormSelectField options={offeredCourseSectionOption as SelectOption[]} name={name} label={label} />
		</>
	);
}
