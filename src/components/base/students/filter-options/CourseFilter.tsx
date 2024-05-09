import { RootState } from '@/redux';
import { useMyCoursesQuery } from '@/redux/apis/base-admin/student/coreStudentApi';
import { setFilter } from '@/redux/slices/academic/coreSemesterSlice';
import { SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CourseFilter() {
	const dispatch = useDispatch();
	const academicCoreSemesterState = useSelector((state: RootState) => state.academicCoreSemester);

	const { data, isLoading } = useMyCoursesQuery({});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const myCourseOptions = data?.myCourses?.map(el => {
		return {
			label: el.course.title,
			value: el.course.id,
		};
	});

	return (
		<div style={{ width: '20%', marginLeft: '10px' }}>
			<SelectField
				value={academicCoreSemesterState?.filterOptions?.courseId as string}
				placeholder="select course"
				options={myCourseOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...academicCoreSemesterState.filterOptions, courseId: el }));
				}}
			/>
		</div>
	);
}
