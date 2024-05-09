import { RootState } from '@/redux';
import { useBuildingsQuery } from '@/redux/apis/buildingApi';
import { setFilter } from '@/redux/slices/roomSlice';
import { SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function BuildingFilter() {
	const dispatch = useDispatch();
	const { data, isLoading } = useBuildingsQuery({ limit: 100, page: 1 });
	const roomState = useSelector((state: RootState) => state.room);

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const buildingsOptions = data?.buildings?.map(building => {
		return {
			label: building.title,
			value: building.id,
		};
	});

	return (
		<div style={{ marginLeft: 'auto', width: '20%' }}>
			<SelectField
				value={roomState.filterOptions.buildingId as string}
				placeholder="select builiding"
				options={buildingsOptions as SelectOption[]}
				handleChange={(el: string) => {
					dispatch(setFilter({ ...roomState.filterOptions, buildingId: el }));
				}}
			/>
		</div>
	);
}
