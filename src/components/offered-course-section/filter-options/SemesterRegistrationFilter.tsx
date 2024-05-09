import { RootState } from '@/redux';
import { useSemesterRegistrationsQuery } from '@/redux/apis/semesterRegistrationApi';
import { setFilter } from '@/redux/slices/offeredCourseSectionSlice';
import { ISemesterRegistration, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SemesterRegistrationFilter() {
	const dispatch = useDispatch();
	const offeredCourseSectionState = useSelector((state: RootState) => state.offeredCourseSection);

	const { data, isLoading } = useSemesterRegistrationsQuery({});

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const semesterRegistrationOptions = data?.semesterRegistrations?.map((semesterRegistration: ISemesterRegistration) => {
		return {
			label:
				semesterRegistration?.academicSemester?.title +
				`(${semesterRegistration?.academicSemester?.year}) - ${semesterRegistration?.status
					.toString()
					.toLowerCase()}`,
			value: semesterRegistration.id,
		};
	});

	return (
		<>
			<div style={{ marginLeft: 'auto' }}>
				<SelectField
					value={offeredCourseSectionState?.filterOptions?.semesterRegistrationId as string}
					placeholder="select semester registration"
					options={semesterRegistrationOptions as SelectOption[]}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...offeredCourseSectionState.filterOptions, semesterRegistrationId: el }));
					}}
				/>
			</div>
		</>
	);
}

export default SemesterRegistrationFilter;
