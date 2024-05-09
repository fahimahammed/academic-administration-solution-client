import { RootState } from '@/redux';
import { useSemesterRegistrationsQuery } from '@/redux/apis/semesterRegistrationApi';
import { setFilter } from '@/redux/slices/offeredCourseScheduleSlice';
import { ISemesterRegistration, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SemesterRegistrationFilter() {
	const dispatch = useDispatch();
	const offeredCourseScheduleState = useSelector((state: RootState) => state.offeredCourseSchedule);

	const { data, isLoading } = useSemesterRegistrationsQuery({});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const semesterRegistrationOptions = data?.semesterRegistrations?.map((semesterRegistration: ISemesterRegistration) => {
		return {
			label: semesterRegistration?.academicSemester?.title + `(${semesterRegistration?.academicSemester?.year})`,
			value: semesterRegistration.id,
		};
	});

	return (
		<>
			<div style={{ marginLeft: 'auto' }}>
				<SelectField
					value={offeredCourseScheduleState?.filterOptions?.semesterRegistrationId as string}
					placeholder="select semester registration"
					options={semesterRegistrationOptions as SelectOption[]}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseScheduleState.filterOptions, semesterRegistrationId: el }));
					}}
				/>
			</div>
		</>
	);
}

export default SemesterRegistrationFilter;
