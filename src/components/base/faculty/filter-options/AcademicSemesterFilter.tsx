import { RootState } from '@/redux';
import { useCoreAcademicSemestersQuery } from '@/redux/apis/academic/coreAcademicSemesterApi';
import { setFilter } from '@/redux/slices/facultySlice';
import { QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AcademicSemesterFilter() {
	const query: Record<string, QueryParamsType> = {};
	const { data, isLoading } = useCoreAcademicSemestersQuery(query);
	const dispatch = useDispatch();

	const facultyState = useSelector((state: RootState) => state.faculty);

	if (isLoading) return <Spin />;

	const academicSemesterOptions = data?.coreAcademicSemesters?.map(semester => {
		return {
			label: semester.title + `(${semester.year})`,
			value: semester.id,
		};
	});

	const academicSemesterId = facultyState?.filterOptions?.academicSemesterId as string;

	return (
		<div style={{ width: '15%', marginLeft: 'auto', marginRight: '5px' }}>
			<SelectField
				value={
					academicSemesterId
						? academicSemesterId
						: data?.coreAcademicSemesters[data?.coreAcademicSemesters.length - 1].id
				}
				placeholder="select academic semester"
				options={academicSemesterOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...facultyState.filterOptions, academicSemesterId: el }));
				}}
			/>
		</div>
	);
}

export default AcademicSemesterFilter;
