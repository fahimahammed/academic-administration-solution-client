import { RootState } from '@/redux';
import { useCoreAcademicSemestersQuery } from '@/redux/apis/academic/coreAcademicSemesterApi';
import { setFilter } from '@/redux/slices/academic/coreSemesterSlice';
import { QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AcademicSemesterFilter() {
	const query: Record<string, QueryParamsType> = {};
	const { data, isLoading } = useCoreAcademicSemestersQuery(query);
	const dispatch = useDispatch();
	const academicCoreSemesterState = useSelector((state: RootState) => state.academicCoreSemester);

	if (isLoading) return <Spin />;

	const academicSemesterOptions = data?.coreAcademicSemesters?.map(semester => {
		return {
			label: semester.title + `(${semester.year})`,
			value: semester.id,
		};
	});

	const academicSemesterId = academicCoreSemesterState?.filterOptions?.academicSemesterId as string;

	return (
		<div style={{ width: '20%', marginLeft: 'auto' }}>
			<SelectField
				value={academicSemesterId}
				placeholder="select academic semester"
				options={academicSemesterOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...academicCoreSemesterState.filterOptions, academicSemesterId: el }));
				}}
			/>
		</div>
	);
}

export default AcademicSemesterFilter;
