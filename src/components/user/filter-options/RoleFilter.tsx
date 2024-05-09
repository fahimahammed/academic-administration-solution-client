import { USER_ROLE } from '@/constants';
import { RootState } from '@/redux';
import { setFilter } from '@/redux/slices/userSlice';
import SelectField from '@/ui/SelectField';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function RoleFilter() {
	const dispatch = useDispatch();
	const userState = useSelector((state: RootState) => state.user);
	const userRole = Object.values(USER_ROLE).map((role: string) => {
		return {
			label: role,
			value: role,
		};
	});

	return (
		<div style={{ marginLeft: 'auto', width: '20%' }}>
			<SelectField
				value={userState.filterOptions.role as string}
				options={userRole}
				placeholder="select role"
				handleChange={(el: string) => {
					dispatch(setFilter({ role: el }));
				}}
			/>
		</div>
	);
}
