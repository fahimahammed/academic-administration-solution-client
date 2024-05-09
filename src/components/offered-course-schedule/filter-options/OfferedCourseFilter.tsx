import { RootState } from '@/redux';
import { useOfferedCoursesQuery } from '@/redux/apis/offeredCourseApi';
import { setFilter } from '@/redux/slices/offeredCourseScheduleSlice';
import { IOfferedCourse, QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CourseFilter() {
	const dispatch = useDispatch();
	const offeredCourseScheduleState = useSelector((state: RootState) => state.offeredCourseSchedule);
	const query: Record<string, QueryParamsType> = {};
	query['semesterRegistrationId'] = offeredCourseScheduleState.filterOptions?.semesterRegistrationId;
	const { data, isLoading } = useOfferedCoursesQuery({ ...query });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const courseOptions = data?.offeredCourses.map((offeredCourse: IOfferedCourse) => {
		return {
			label: offeredCourse?.course?.title,
			value: offeredCourse?.id,
		};
	});

	return (
		<>
			<div style={{ marginLeft: 'auto' }}>
				<SelectField
					value={offeredCourseScheduleState?.filterOptions?.offeredCourseId as string}
					placeholder="select course"
					options={courseOptions as SelectOption[]}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseScheduleState.filterOptions, offeredCourseId: el }));
					}}
				/>
			</div>
		</>
	);
}

export default CourseFilter;
