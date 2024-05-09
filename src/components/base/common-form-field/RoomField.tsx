import { FormSelectField } from '@/components/forms';
import { useRoomsQuery } from '@/redux/apis/roomApi';
import { IRoom, QueryParamsType, SelectOption } from '@/types';
import { Spin } from 'antd';
import React from 'react';

type RoomFieldProps = {
	name: string;
	label: string;
	query?: Record<string, QueryParamsType>;
};

export default function RoomField({ name, label, query }: RoomFieldProps) {
	const { data, isLoading } = useRoomsQuery({ ...query });

	if (isLoading)
		return (
			<div className="example">
				<Spin />
			</div>
		);

	const roomOptions = data?.rooms.map((room: IRoom) => {
		return {
			label: room?.roomNumber,
			value: room?.id,
		};
	});
	return (
		<>
			<FormSelectField options={roomOptions as SelectOption[]} name={name} label={label} />
		</>
	);
}
