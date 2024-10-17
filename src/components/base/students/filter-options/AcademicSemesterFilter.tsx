import { RootState } from '@/redux';
import { useCoreAcademicSemestersQuery } from '@/redux/apis/academic/coreAcademicSemesterApi';
import { setFilter, setDefault } from '@/redux/slices/academic/coreSemesterSlice';
import { QueryParamsType, SelectOption } from '@/types';
import { IAcademicCoreSemester } from '@/types/academic/semester';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AcademicSemesterFilter() {
	const query: Record<string, QueryParamsType> = {};
	const { data, isLoading } = useCoreAcademicSemestersQuery(query);
	const dispatch = useDispatch();

	const academicCoreSemesterState = useSelector((state: RootState) => state.academicCoreSemester);

	useEffect(() => {
		dispatch(
			setFilter({
				...academicCoreSemesterState.filterOptions,
				academicSemesterId: data?.coreAcademicSemesters.find((el: IAcademicCoreSemester) => el.isCurrent === true)
					?.id,
			})
		);
		return () => {
			dispatch(setDefault());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) return <Spin />;

	const academicSemesterOptions = data?.coreAcademicSemesters?.map(semester => {
		return {
			label: semester.title + `-${semester.year} ${semester.isCurrent ? '(ongoing)' : ''}`,
			value: semester.id,
		};
	});

	const academicSemesterId = academicCoreSemesterState?.filterOptions?.academicSemesterId as string;

	return (
		<div style={{ width: '20%' }}>
			<SelectField
				value={academicSemesterId}
				placeholder="Select academic semester"
				options={academicSemesterOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...academicCoreSemesterState.filterOptions, academicSemesterId: el }));
				}}
			/>
		</div>
	);
}

export default AcademicSemesterFilter;
