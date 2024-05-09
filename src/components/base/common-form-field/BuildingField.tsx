import { FormSelectField } from '@/components/forms';
import { useBuildingsQuery } from '@/redux/apis/buildingApi';
import { SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type BuildingProps = {
	name: string;
	label: string;
};

export default function BuildingField({ name, label }: BuildingProps) {
	const { data, isLoading } = useBuildingsQuery({ limit: 100, page: 1 });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const buildingOptions = data?.buildings?.map(building => {
		return {
			label: building.title,
			value: building.id,
		};
	});

	return (
		<>
			<FormSelectField options={buildingOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
