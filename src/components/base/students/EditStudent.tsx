import { Form, FormInput, FormSelectField, FormTextArea } from '@/components/forms';
import { logger } from '@/services';
import { bloodGroupOptions, genderOptions } from '@/constants';
import { parsedStudentUpdateRequestPayload } from '@/transformer';
import { useStudentQuery, useUpdateStudentMutation } from '@/redux/apis/base-admin/student/studentApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { IError, StudentPayload } from '@/types';
import { Col, Row } from 'antd';
import FormDatePicker from '@/components/forms/FormDatePicker';
import PHUButton from '@/ui/PHUButton';

type EditStudentProps = {
	id: string | string[] | undefined;
	base?: string;
};

const EditStudent = ({ id, base }: EditStudentProps) => {
	const [updateStudent] = useUpdateStudentMutation();
	const { data, isLoading } = useStudentQuery(id);
	const studentOnSubmit = async (values: StudentPayload) => {
		const parsedRequestBody = parsedStudentUpdateRequestPayload(values);
		try {
			await updateStudent({ id, body: parsedRequestBody }).unwrap();
			notifySuccess('Student updated successfully');
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
		subject: data?.subject || '',
		department: data?.department || '',
		contactNo: data?.contactNo || '',
		emergencyContactNo: data?.emergencyContactNo || '',
		permanentAddress: data?.permanentAddress || '',
		presentAddress: data?.presentAddress || '',
		gender: data?.gender || '',
		bloodGroup: data?.bloodGroup || '',
		guardian: {
			fatherName: data?.guardian?.fatherName || '',
			fatherOccupation: data?.guardian?.fatherOccupation || '',
			fatherContactNo: data?.guardian?.fatherContactNo || '',
			motherName: data?.guardian?.motherName || '',
			motherOccupation: data?.guardian?.motherOccupation || '',
			motherContactNo: data?.guardian?.motherContactNo || '',
			address: data?.guardian?.address || '',
		},
		localGuardian: {
			name: data?.localGuardian?.name || '',
			occupation: data?.localGuardian?.occupation || '',
			contactNo: data?.localGuardian?.contactNo || '',
			address: data?.localGuardian?.address || '',
		},
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: `${base}`, link: `/${base}` },
					{ label: 'student', link: `/${base}/student` },
					{ label: 'edit', link: '' },
					{ label: `${id}`, link: `/${base}/student/edit/${id}` },
				]}
			/>
			<ActionBar title={`edit student - ${id}`}></ActionBar>
			<Form onSubmit={studentOnSubmit} defaultValues={defaultValue}>
				{/* student information */}
				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Student information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="name.firstName" label="first name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="name.middleName" label="middle name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="name.lastName" label="last name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormSelectField name="gender" label="Gender" options={genderOptions} />
						</Col>
					</Row>
				</div>

				{/* basic information  */}
				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Basic information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput type="email" name="email" label="email address" />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="contactNo" label="Contact no." />
						</Col>

						<Col span={8} style={{ margin: '10px 0' }}>
							<FormInput name="emergencyContactNo" label="Emergency contact no." />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormSelectField name="bloodGroup" label="Blood group" options={bloodGroupOptions} />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormDatePicker name="dateOfBirth" label="Date of birth" />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="presentAddress" label="Present address" rows={4} />
						</Col>

						<Col span={12} style={{ margin: '10px 0' }}>
							<FormTextArea name="permanentAddress" label="Parmanent address" rows={4} />
						</Col>
					</Row>
				</div>

				{/* gurdian information  */}
				<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
					<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Guardian information</p>
					<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="guardian.fatherName" label="Father name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="guardian.fatherOccupation" label="Father occupation" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="guardian.fatherContactNo" label="Father contact no." />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="guardian.motherName" label="Mother name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="guardian.motherOccupation" label="Mother occupation" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="guardian.motherContactNo" label="Mother contact no." />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="guardian.address" label="Address" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="localGuardian.name" label="Local gurdian name" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="localGuardian.occupation" label="Local gurdian occupation" />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="localGuardian.contactNo" label="Local gurdian contact no." />
						</Col>

						<Col span={6} style={{ margin: '10px 0' }}>
							<FormInput name="localGuardian.address" label="Local gurdian address" />
						</Col>
					</Row>
				</div>

				<PHUButton htmlType="submit">update</PHUButton>
			</Form>
		</>
	);
};

export default EditStudent;
