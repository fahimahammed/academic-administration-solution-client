import { Form, FormInput, FormSelectField, FormTextArea } from '@/components/forms';
import { logger } from '@/services';
import { bloodGroupOptions, genderOptions } from '@/constants';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { AdminSchema } from '@/schemas';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddAdminWithFormDataMutation } from '@/redux/apis/base-admin/admin/adminApi';
import { parseAdminRequestPayload } from '@/transformer/admin';
import { AdminPayload, IError } from '@/types';
import { Col, Row } from 'antd';
import PHUButton from '@/ui/PHUButton';
import FormDatePicker from '@/components/forms/FormDatePicker';
import PHUUploadImage from '@/ui/PHUUploadImage';
import { RcFile } from 'antd/es/upload';

const CreateAdmin = () => {
	const [addAdminWithFormData] = useAddAdminWithFormDataMutation();
	const adminOnSubmit = async (values: AdminPayload) => {
		const value: { file: RcFile | string | Blob | undefined; data: string } = parseAdminRequestPayload(values);
		const formData = new FormData();
		formData.append('file', value?.file as Blob);
		formData.append('data', value.data);
		try {
			await addAdminWithFormData(formData).unwrap();
			notifySuccess('Admin created successfully');
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
					{ label: 'super-admin', link: '/super-admin' },
					{ label: 'admin', link: '/super-admin/admin' },
				]}
			/>
			<ActionBar title="create admin"></ActionBar>
			<Form onSubmit={adminOnSubmit} resolver={yupResolver(AdminSchema)}>
				{/* admin information */}
				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Admin information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="admin.firstName" label="first name" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="admin.middleName" label="middle name" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="admin.lastName" label="last name" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput type="password" name="password" label="Password" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormSelectField name="admin.gender" label="Gender" options={genderOptions} />
						</Col>

						{/* <Col span={8} style={{ margin: '10px 0' }}>
							<DepartmentField name="admin.managementDepartment" label="department" />
						</Col> */}

						<Col span={8} style={{ margin: '10px 0' }}>
							<PHUUploadImage name="file" />
						</Col>
					</Row>
				</div>

				{/* basic information  */}
				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Basic information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput type="email" name="admin.email" label="email address" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="admin.contactNo" label="Contact no." />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="admin.emergencyContactNo" label="Emergency contact no." />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormDatePicker name="admin.dateOfBirth" label="Date of birth" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormSelectField name="admin.bloodGroup" label="Blood group" options={bloodGroupOptions} />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="admin.designation" label="Designation" />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="admin.presentAddress" label="Present address" rows={4} />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="admin.permanentAddress" label="Parmanent address" rows={4} />
						</Col>
					</Row>
				</div>

				<PHUButton htmlType="submit">submit</PHUButton>
			</Form>
		</>
	);
};

export default CreateAdmin;
