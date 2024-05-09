import { Form, FormInput } from '@/components/forms';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { useAddDepertmentMutation } from '@/redux/apis/departmentApi';
import { IError } from '@/types';

const CreateDepartment = ({ base }: { base: string }) => {
	const [addDepartment] = useAddDepertmentMutation();
	const createDepartmentOnSubmit = async (values: { title: string }) => {
		try {
			await addDepartment(values).unwrap();
			notifySuccess('Department created successfully');
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
					{ label: `${base}`, link: `/${base}` },
					{ label: 'department', link: `/${base}/department` },
					{ label: 'create', link: `/${base}/department/create` },
				]}
			/>
			<ActionBar title="create department"></ActionBar>
			<Form onSubmit={createDepartmentOnSubmit}>
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

export default CreateDepartment;
