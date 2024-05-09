import CoreAcademicDepartmentField from '@/components/base/common-field/CoreAcademicDepartmantField';
import { RootState } from '@/redux';
import { setFilter } from '@/redux/slices/offeredCourseSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AcademicDepartmentFilter() {
	const dispatch = useDispatch();
	const offeredCourseState = useSelector((state: RootState) => state.offeredCourse);

	return (
		<>
			<div style={{ marginLeft: 'auto' }}>
				<CoreAcademicDepartmentField
					value={offeredCourseState?.filterOptions?.academicDepartmentId as string}
					onChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseState.filterOptions, academicDepartmentId: el }));
					}}
					placeholder="select academic department"
				/>
			</div>
		</>
	);
}

export default AcademicDepartmentFilter;
