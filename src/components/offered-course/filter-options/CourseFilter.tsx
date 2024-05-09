import { RootState } from '@/redux';
import { useCoursesQuery } from '@/redux/apis/courseApi';
import { setFilter } from '@/redux/slices/offeredCourseSlice';
import { ICourse, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CourseFilter() {
	const dispatch = useDispatch();
	const offeredCourseState = useSelector((state: RootState) => state.offeredCourse);

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
			<div style={{ marginLeft: 'auto' }}>
				<SelectField
					value={offeredCourseState?.filterOptions?.courseId as string}
					placeholder="select course"
					options={courseOptions as SelectOption[]}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseState.filterOptions, courseId: el }));
					}}
				/>
			</div>
		</>
	);
}

export default CourseFilter;
