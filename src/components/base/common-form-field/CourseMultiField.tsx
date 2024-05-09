import { FormMultiSelectField } from '@/components/forms';
import { DEBOUNCE_DELAY } from '@/constants';
import { useDebounce } from '@/hooks';
import { useCoursesQuery } from '@/redux/apis/courseApi';
import { ICourse, QueryParamsType, SelectOption } from '@/types';
import { Spin } from 'antd';
import React, { useState } from 'react';

type CourseFieldProps = {
	name: string;
	label: string;
};

export default function CourseMultiField({ name, label }: CourseFieldProps) {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};
	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useCoursesQuery({ ...query });

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
			<FormMultiSelectField
				name={name}
				options={courseOptions as SelectOption[]}
				onSearch={(e: string) => setSearchTerm(e)}
				handleOnChange={el => {
					// console.log(el)
					return el;
				}}
				loading={isLoading}
				label={label}
				onClear={() => {
					setSearchTerm('');
				}}
			/>
		</>
	);
}
