import { bloodGroupOptions, genderOptions } from '@/constants';
import { RootState } from '@/redux';
import { setFilter } from '@/redux/slices/adminSlice';
import SelectField from '@/ui/SelectField';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DepartmentFilter from './DepartmentFIlter';

function FilterOptions() {
	const dispatch = useDispatch();
	const adminState = useSelector((state: RootState) => state.admin);

	return (
		<>
			<div style={{ margin: '5px 0' }}>
				<SelectField
					value={adminState.filterOptions.gender as string}
					placeholder="select gender"
					options={genderOptions}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...adminState.filterOptions, gender: el }));
					}}
				/>
			</div>

			<div style={{ margin: '5px 0' }}>
				<SelectField
					value={adminState.filterOptions.bloodGroup as string}
					placeholder="select blood group"
					options={bloodGroupOptions}
					handleChange={(el: string) => {
						dispatch(setFilter({ ...adminState.filterOptions, bloodGroup: el }));
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
