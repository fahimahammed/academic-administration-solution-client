import { Form, FormInput, FormSelectField, FormTextArea } from '@/components/forms';
import { logger } from '@/services';
import { bloodGroupOptions, genderOptions } from '@/constants';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { useFacultyQuery, useUpdateFacultyMutation } from '@/redux/apis/base-admin/faculty/facultyApi';
import { parsedFacultyUpdateRequestPayload } from '@/transformer/faculty';
import { Col, Row } from 'antd';
import FormDatePicker from '@/components/forms/FormDatePicker';
import Button from '@/ui/Button';
import AcademicFacultyField from '../common-form-field/AcademicFacultyField';
import AcademicDepartmentField from '../common-form-field/AcademicDepartmentField';
import { FacultyPayload, IError } from '@/types';

type EditStudentProps = {
	id: string | string[] | undefined;
	base?: string;
};

const EditFaculty = ({ id, base }: EditStudentProps) => {
	const [updateFaculty] = useUpdateFacultyMutation();
	const { data, isLoading } = useFacultyQuery(id);
	const facultyOnSubmit = async (values: FacultyPayload) => {
		const parsedRequestBody = parsedFacultyUpdateRequestPayload(values);
		try {
			await updateFaculty({ id, body: parsedRequestBody }).unwrap();
			notifySuccess('Faculty updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValue = {
		name: {
			firstName: data?.name?.firstName || '',
			lastName: data?.name?.lastName || '',
			middleName: data?.name?.middleName || '',
		},
		dateOfBirth: data?.dateOfBirth || '',
		email: data?.email || '',
		designation: data?.designation || '',
		department: data?.department || '',
		contactNo: data?.contactNo || '',
		emergencyContactNo: data?.emergencyContactNo || '',
		permanentAddress: data?.permanentAddress || '',
		presentAddress: data?.presentAddress || '',
		bloodGroup: data?.bloodGroup || '',
		gender: data?.gender || '',
		academicDepartment: data?.academicDepartment?.id,
		academicFaculty: data?.academicFaculty?.id,
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `${base}`, link: `/${base}` },
					{ label: 'faculty', link: `/${base}/faculty` },
					{ label: 'edit', link: '' },
					{ label: data?.id, link: `/${base}/faculty/edit/${data?.id}` },
				]}
			/>
			<ActionBar title={`edit faculty - ${data?.id}`}></ActionBar>
			<Form onSubmit={facultyOnSubmit} defaultValues={defaultValue}>
				{/* faculty information */}
				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Faculty information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="name.firstName" label="first name" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="name.middleName" label="middle name" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="name.lastName" label="last name" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormSelectField name="gender" label="Gender" options={genderOptions} />
						</Col>
					</Row>
				</div>

				{/* basic information  */}

				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Basic information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput type="email" name="email" label="email address" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="contactNo" label="Contact no." />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="emergencyContactNo" label="Emergency contact no." />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormDatePicker name="dateOfBirth" label="Date of birth" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormSelectField name="bloodGroup" label="Blood group" options={bloodGroupOptions} />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<AcademicFacultyField name="academicFaculty" label="academic faculty" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<AcademicDepartmentField name="academicDepartment" label="academic department" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="designation" label="Designation" />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="presentAddress" label="Present address" rows={4} />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="permanentAddress" label="Parmanent address" rows={4} />
						</Col>
					</Row>
				</div>

				<Button htmlType="submit">update</Button>
			</Form>
		</>
	);
};

export default EditFaculty;
