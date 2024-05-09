import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useAddRoomMutation } from '@/redux/apis/roomApi';
import BuildingField from '../base/common-form-field/BuildingField';
import { IError } from '@/types';

const CreateRoom = () => {
	const [addRoom] = useAddRoomMutation();

	const createRoomOnSubmit = async (values: { title: string }) => {
		try {
			await addRoom(values).unwrap();
			notifySuccess('Room created successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};
	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'room', link: '/admin/room' },
					{ label: 'create', link: '/admin/room/create' },
				]}
			/>
			<ActionBar title="create room"></ActionBar>
			<Form onSubmit={createRoomOnSubmit}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8}>
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
				<Button htmlType="submit">add</Button>
			</Form>
		</>
	);
};

export default CreateRoom;
