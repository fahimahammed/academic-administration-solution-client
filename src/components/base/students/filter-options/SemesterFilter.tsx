import { RootState } from '@/redux';
import { useAcademicSemestersQuery } from '@/redux/apis/academic/semesterApi';
import { setFilter } from '@/redux/slices/studentSlice';
import { SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function SemesterFilter() {
	const dispatch = useDispatch();
	const { data, isLoading } = useAcademicSemestersQuery({ limit: 100, page: 1 });
	const studentState = useSelector((state: RootState) => state.student);

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicSemesterOptions = data?.academicSemesters?.map(semester => {
		return {
			label: `${semester.title}-${semester.year}`,
			value: semester.id,
		};
	});

	return (
		<>
			<SelectField
				value={studentState.filterOptions.academicSemester as string}
				placeholder="Select academic semester"
				options={academicSemesterOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...studentState.filterOptions, academicSemester: el }));
				}}
				disabled={
					studentState.filterOptions.academicFaculty && studentState.filterOptions.academicDepartment
						? false
						: true
				}
			/>
		</>
	);
}
