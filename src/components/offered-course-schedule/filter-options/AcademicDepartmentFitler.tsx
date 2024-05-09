import CoreAcademicDepartmentField from '@/components/base/common-field/CoreAcademicDepartmantField';
import { RootState } from '@/redux';
import { setFilter } from '@/redux/slices/offeredCourseScheduleSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AcademicDepartmentFilter() {
	const dispatch = useDispatch();
	const offeredCourseScheduleState = useSelector((state: RootState) => state.offeredCourseSchedule);

	return (
		<>
			<div style={{ marginLeft: 'auto' }}>
				<CoreAcademicDepartmentField
					value={offeredCourseScheduleState?.filterOptions?.academicDepartmentId as string}
					onChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseScheduleState.filterOptions, academicDepartmentId: el }));
					}}
					placeholder="select academic department"
				/>
			</div>
		</>
	);
}

export default AcademicDepartmentFilter;
