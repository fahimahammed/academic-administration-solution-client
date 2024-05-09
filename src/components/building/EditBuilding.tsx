import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useBuildingQuery, useUpdateBuildingMutation } from '@/redux/apis/buildingApi';
import { IError } from '@/types';

const EditBuilding = ({ id }: { id: string }) => {
	const { data, isLoading } = useBuildingQuery(id);
	const [updateBuilding] = useUpdateBuildingMutation();
	const updateBuildingOnSubmit = async (values: { title: string }) => {
		try {
			await updateBuilding({ id, body: values }).unwrap();
			notifySuccess('Building updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		title: data?.title || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'building', link: '/admin/building' },
					{ label: 'edit', link: `/admin/building/edit/${id}` },
				]}
			/>
			<ActionBar title="edit building"></ActionBar>
			<Form onSubmit={updateBuildingOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<FormInput name="title" label="title" />
					</Col>
				</Row>
				<Button htmlType="submit">update</Button>
			</Form>
		</>
	);
};

export default EditBuilding;
