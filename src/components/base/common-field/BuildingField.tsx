import { useBuildingsQuery } from '@/redux/apis/buildingApi';
import { QueryParamsType, SelectOption } from '@/types';
import SelectField from '@/ui/SelectField';
import { Spin } from 'antd';
import React from 'react';

type BuildingProps = {
	label?: string;
	query?: Record<string, QueryParamsType>;
	onChange: (el: string) => void;
	placeholder?: string;
};

export default function BuildingField({ label, query, onChange, placeholder = 'select' }: BuildingProps) {
	const { data, isLoading } = useBuildingsQuery({ ...query });

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
			{label && <label style={{ textTransform: 'capitalize' }}>{label}</label>}
			<SelectField
				options={buildingOptions as SelectOption[]}
				handleChange={(el: string) => {
					onChange(el);
				}}
				placeholder={placeholder}
			/>
		</>
	);
}
