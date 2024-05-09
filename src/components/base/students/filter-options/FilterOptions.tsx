import { bloodGroupOptions, genderOptions } from '@/constants';
import { RootState } from '@/redux';
import { setFilter } from '@/redux/slices/studentSlice';
import SelectField from '@/ui/SelectField';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DepartmentFilter from './DepartmentFilter';
import FacultyFilter from './FacultyFilter';
import SemesterFilter from './SemesterFilter';

function FilterOptions() {
	const dispatch = useDispatch();
	const studentState = useSelector((state: RootState) => state.student);

	return (
		<>
			<div style={{ margin: '5px 0' }}>
				<SelectField
					value={studentState.filterOptions.gender as string}
					placeholder="select gender"
					options={genderOptions}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...studentState.filterOptions, gender: el }));
					}}
				/>
			</div>

			<div style={{ margin: '5px 0' }}>
				<SelectField
					value={studentState.filterOptions.bloodGroup as string}
					placeholder="select blood group"
					options={bloodGroupOptions}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...studentState.filterOptions, bloodGroup: el }));
					}}
				/>
			</div>

			<div style={{ margin: '5px 0' }}>
				<FacultyFilter />
			</div>

			<div style={{ margin: '5px 0' }}>
				<DepartmentFilter />
			</div>

			<div style={{ margin: '5px 0' }}>
				<SemesterFilter />
			</div>
		</>
	);
}

export default FilterOptions;
