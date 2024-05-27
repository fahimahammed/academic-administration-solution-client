import { RootState } from '@/redux';
import { useOfferedCourseSectionsQuery } from '@/redux/apis/offerdCourseSectionApi';
import { setFilter } from '@/redux/slices/offeredCourseScheduleSlice';
import { IOfferedCourseSection, QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SectionFilter() {
	const dispatch = useDispatch();
	const offeredCourseScheduleState = useSelector((state: RootState) => state.offeredCourseSchedule);
	const query: Record<string, QueryParamsType> = {};
	query['offeredCourseId'] = offeredCourseScheduleState.filterOptions?.offeredCourseId;
	const { data, isLoading } = useOfferedCourseSectionsQuery({ ...query });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const courseOptions = data?.offeredCourseSections.map((offeredCourseSection: IOfferedCourseSection) => {
		return {
			label: offeredCourseSection?.title,
			value: offeredCourseSection?.id,
		};
	});

	return (
		<>
			<div style={{ marginLeft: 'auto' }}>
				<SelectField
					value={offeredCourseScheduleState?.filterOptions?.offeredCourseSectionId as string}
					placeholder="select course section"
					options={courseOptions as SelectOption[]}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseScheduleState.filterOptions, offeredCourseSectionId: el }));
					}}
				/>
			</div>
		</>
	);
}

export default SectionFilter;
