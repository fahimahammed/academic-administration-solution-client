import CoreAcademicDepartmentField from '@/components/base/common-field/CoreAcademicDepartmantField';
import { RootState } from '@/redux';
import { setFilter } from '@/redux/slices/offeredCourseSectionSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AcademicDepartmentFilter() {
	const dispatch = useDispatch();
	const offeredCourseSectionState = useSelector((state: RootState) => state.offeredCourseSection);

	return (
		<>
			<div style={{ marginLeft: 'auto' }}>
				<CoreAcademicDepartmentField
					value={offeredCourseSectionState?.filterOptions?.academicDepartmentId as string}
					onChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseSectionState.filterOptions, academicDepartmentId: el }));
					}}
					placeholder="select academic department"
				/>
			</div>
		</>
	);
}

export default AcademicDepartmentFilter;
