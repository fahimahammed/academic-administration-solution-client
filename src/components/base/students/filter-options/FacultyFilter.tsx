import { RootState } from '@/redux';
import { useAcademicFacultiesQuery } from '@/redux/apis/academic/facultyApi';
import { setFilter } from '@/redux/slices/studentSlice';
import { SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FacultyFilter() {
	const dispatch = useDispatch();
	const { data, isLoading } = useAcademicFacultiesQuery({ limit: 100, page: 1 });
	const studentState = useSelector((state: RootState) => state.student);

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicFacultyOptions = data?.academicFaculties?.map(faculty => {
		return {
			label: faculty.title,
			value: faculty.id,
		};
	});

	return (
		<>
			<SelectField
				value={studentState.filterOptions.academicFaculty as string}
				placeholder="select academic faculty"
				options={academicFacultyOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...studentState.filterOptions, academicFaculty: el }));
				}}
			/>
		</>
	);
}
