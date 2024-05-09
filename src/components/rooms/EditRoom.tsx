import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useRoomQuery, useUpdateRoomMutation } from '@/redux/apis/roomApi';
import BuildingField from '../base/common-form-field/BuildingField';
import { IError } from '@/types';

const EditRoom = ({ id }: { id: string }) => {
	const { data, isLoading } = useRoomQuery(id);
	const [updateRoom] = useUpdateRoomMutation();
	const updateRoomOnSubmit = async (values: { title: string }) => {
		try {
			await updateRoom({ id, body: values }).unwrap();
			notifySuccess('Room updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		roomNumber: data?.roomNumber || '',
		floor: data?.floor || '',
		buildingId: data?.buildingId || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'room', link: '/admin/room' },
					{ label: 'edit', link: `/admin/room/edit/${id}` },
				]}
			/>
			<ActionBar title="edit room"></ActionBar>
			<Form onSubmit={updateRoomOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="roomNumber" label="room number" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="floor" label="floor" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<BuildingField name="buildingId" label="select build field" />
						</div>
					</Col>
				</Row>
				<PHUButton htmlType="submit">save</PHUButton>
			</Form>
		</>
	);
};

export default EditRoom;
