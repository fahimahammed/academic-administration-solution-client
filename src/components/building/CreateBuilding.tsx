import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useAddBuildingMutation } from '@/redux/apis/buildingApi';
import { IError } from '@/types';

const CreateBuilding = () => {
	const [addBuilding] = useAddBuildingMutation();
	const createBuildingOnSubmit = async (values: { title: string }) => {
		try {
			await addBuilding(values).unwrap();
			notifySuccess('Building created successfully');
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
					{ label: 'building', link: '/admin/building' },
					{ label: 'create', link: '/admin/building/create' },
				]}
			/>
			<ActionBar title="create building"></ActionBar>
			<Form onSubmit={createBuildingOnSubmit}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<FormInput name="title" label="title" />
					</Col>
				</Row>
				<Button htmlType="submit">add</Button>
			</Form>
		</>
	);
};

export default CreateBuilding;
