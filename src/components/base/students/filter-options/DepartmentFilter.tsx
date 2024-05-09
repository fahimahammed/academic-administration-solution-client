import { RootState } from '@/redux';
import { useAcademicDepartmentsQuery } from '@/redux/apis/academic/departmentApi';
import { setFilter } from '@/redux/slices/studentSlice';
import { QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DepartmentFilter() {
	const dispatch = useDispatch();
	const studentState = useSelector((state: RootState) => state.student);
	const query: Record<string, QueryParamsType> = {};

	query['limit'] = 100;
	query['page'] = 1;
	if (!!studentState.filterOptions.academicFaculty) query['academicFaculty'] = studentState.filterOptions.academicFaculty;
	// if(!!academicFacultyId) query['academicFacultyId'] = academicFacultyId;
	const { data, isLoading } = useAcademicDepartmentsQuery(query);

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const academicDepartmentOptions = data?.academicDepartments?.map(department => {
		return {
			label: department.title,
			value: department.id,
		};
	});

	return (
		<>
			<SelectField
				value={studentState.filterOptions.academicDepartment as string}
				placeholder="select academic department"
				options={academicDepartmentOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...studentState.filterOptions, academicDepartment: el }));
				}}
				disabled={studentState.filterOptions.academicFaculty ? false : true}
			/>
		</>
	);
}
