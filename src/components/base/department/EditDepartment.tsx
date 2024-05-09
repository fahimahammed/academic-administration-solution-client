import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useDepartmentQuery, useUpdateDepartmentMutation } from '@/redux/apis/departmentApi';
import { IError } from '@/types';

type EdirDepartmentProps = {
	id: string;
	base: string;
};

const EditDepartment = ({ id, base }: EdirDepartmentProps) => {
	const { data, isLoading } = useDepartmentQuery(id);
	const [updateDepartment] = useUpdateDepartmentMutation();
	const updateDepartmentOnSubmit = async (values: { title: string }) => {
		try {
			await updateDepartment({ id, body: values }).unwrap();
			notifySuccess('Department updated successfully');
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
					{ label: `${base}`, link: `/${base}` },
					{ label: 'department', link: `/${base}/department` },
					{ label: 'edit', link: `/${base}/department/edit/${id}` },
				]}
			/>
			<ActionBar title="edit department"></ActionBar>
			<Form onSubmit={updateDepartmentOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<FormInput name="title" label="title" />
					</Col>
				</Row>
				<PHUButton htmlType="submit">update</PHUButton>
			</Form>
		</>
	);
};

export default EditDepartment;
