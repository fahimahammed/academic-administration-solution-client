import { Form, FormInput, FormSelectField, FormTextArea } from '@/components/forms';
import { logger } from '@/services';
import { bloodGroupOptions, genderOptions } from '@/constants';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { FacultySchema } from '@/schemas';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddFacultyWithFormDataMutation } from '@/redux/apis/base-admin/faculty/facultyApi';
import { Col, Row, Spin } from 'antd';
import FormDatePicker from '@/components/forms/FormDatePicker';
import PHUButton from '@/ui/PHUButton';
import { FacultyPayload, IError } from '@/types';
import AcademicDepartment from '../common-form-field/AcademicDepartmentField';
import AcademicFacultyField from '../common-form-field/AcademicFacultyField';
import PHUUploadImage from '@/ui/PHUUploadImage';
import { parseFacultyRequestPayload } from '@/transformer/faculty';
import { RcFile } from 'antd/es/upload';
import { useState } from 'react';

const CreateFaculty = ({ base }: { base?: string }) => {
	const [addFacultyWithFormData] = useAddFacultyWithFormDataMutation();
	const [isLoading, setIsLoading] = useState(false);
	const facultyOnSubmit = async (values: FacultyPayload) => {
		const value: { file: RcFile | string | Blob | undefined; data: string } = parseFacultyRequestPayload(values);
		const formData = new FormData();
		formData.append('file', value?.file as Blob);
		formData.append('data', value.data);
		try {
			setIsLoading(true);
			await addFacultyWithFormData(formData).unwrap();
			setIsLoading(false);
			notifySuccess('Faculty created successfully');
		} catch (error) {
			setIsLoading(false);
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
					{ label: 'faculty', link: `/${base}/faculty` },
				]}
			/>
			<ActionBar title="Create Faculty"></ActionBar>

			{isLoading && <>
				<div style={{ marginLeft: 'auto', marginRight: '20px' }}>
					<div className="example">
						<Spin />
					</div>
				</div>
			</>}

			<Form onSubmit={facultyOnSubmit} resolver={yupResolver(FacultySchema)}>
				{/* faculty information */}
				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Faculty information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="faculty.firstName" label="first name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="faculty.middleName" label="middle name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="faculty.lastName" label="last name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput type="password" name="password" label="Password" />
						</Col>
						<Col span={8} style={{ margin: '10px 0' }}>
							<FormSelectField name="faculty.gender" label="Gender" options={genderOptions} />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<AcademicFacultyField name="faculty.academicFacultyId" label="academic faculty" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<AcademicDepartment name="faculty.academicDepartmentId" label="academic department" />
						</Col>

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
							<FormInput type="email" name="faculty.email" label="email address" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="faculty.contactNo" label="Contact no." />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="faculty.emergencyContactNo" label="Emergency contact no." />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormDatePicker name="faculty.dateOfBirth" label="Date of birth" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormSelectField name="faculty.bloodGroup" label="Blood group" options={bloodGroupOptions} />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="faculty.designation" label="Designation" />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="faculty.presentAddress" label="Present address" rows={4} />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="faculty.permanentAddress" label="Parmanent address" rows={4} />
						</Col>
					</Row>
				</div>

				<PHUButton htmlType="submit">Submit</PHUButton>
			</Form>
		</>
	);
};

export default CreateFaculty;
