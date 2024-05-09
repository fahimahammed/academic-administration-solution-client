import { bloodGroupOptions, genderOptions } from '@/constants';
import { RootState } from '@/redux';
import { setFilter } from '@/redux/slices/facultySlice';
import SelectField from '@/ui/SelectField';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DepartmentFilter from './DepartmentFilter';

function FilterOptions() {
	const dispatch = useDispatch();
	const facultyState = useSelector((state: RootState) => state.faculty);

	return (
		<>
			<div style={{ margin: '5px 0' }}>
				<SelectField
					value={facultyState.filterOptions.gender as string}
					placeholder="select gender"
					options={genderOptions}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...facultyState.filterOptions, gender: el }));
					}}
				/>
			</div>

			<div style={{ margin: '5px 0' }}>
				<SelectField
					value={facultyState.filterOptions.bloodGroup as string}
					placeholder="select blood group"
					options={bloodGroupOptions}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...facultyState.filterOptions, bloodGroup: el }));
					}}
				/>
			</div>

			<div style={{ margin: '5px 0' }}>
				<DepartmentFilter />
			</div>
		</>
	);
}

export default FilterOptions;
