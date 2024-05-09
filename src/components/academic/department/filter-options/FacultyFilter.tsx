import { RootState } from '@/redux';
import { useAcademicFacultiesQuery } from '@/redux/apis/academic/facultyApi';
import { setFilter } from '@/redux/slices/academic/departmentSlice';
import { SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FacultyFilter() {
	const dispatch = useDispatch();
	const departmentState = useSelector((state: RootState) => state.academicDepartment);

	const { data, isLoading } = useAcademicFacultiesQuery({ limit: 100, page: 1 });

	if (isLoading)
		return (
			<div style={{ marginLeft: 'auto' }}>
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
			<div style={{ marginLeft: 'auto' }}>
				<SelectField
					value={departmentState?.filterOptions?.academicFaculty as string}
					placeholder="select academic faculty"
					options={academicFacultyOptions as SelectOption[]}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...departmentState.filterOptions, academicFaculty: el }));
					}}
				/>
			</div>
		</>
	);
}

export default FacultyFilter;
