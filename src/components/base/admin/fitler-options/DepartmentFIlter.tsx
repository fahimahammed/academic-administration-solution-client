import { RootState } from '@/redux';
import { useAcademicDepartmentsQuery } from '@/redux/apis/academic/departmentApi';
import { setFilter } from '@/redux/slices/adminSlice';
import { SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DepartmentFilter() {
	const dispatch = useDispatch();
	const { data, isLoading } = useAcademicDepartmentsQuery({ limit: 100, page: 1 });
	const adminState = useSelector((state: RootState) => state.admin);

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
				value={adminState.filterOptions.department as string}
				placeholder="select academic department"
				options={academicDepartmentOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...adminState.filterOptions, department: el }));
				}}
			/>
		</>
	);
}
