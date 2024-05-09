import { FormInput, FormSelectField, FormTextArea } from '@/components/forms';
import FormDatePicker from '@/components/forms/FormDatePicker';
import { bloodGroupOptions } from '@/constants';
import { Col, Row } from 'antd';
import React from 'react';

export default function BasicInfo() {
	return (
		<>
			<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<FormInput type="email" name="student.email" label="email address" />
					</Col>

					<Col span={8} style={{ margin: '10px 0' }}>
						<FormInput name="student.contactNo" label="Contact no." />
					</Col>

					<Col span={8} style={{ margin: '10px 0' }}>
						<FormInput name="student.emergencyContactNo" label="Emergency contact no." />
					</Col>

					<Col span={12} style={{ margin: '10px 0' }}>
						<FormSelectField name="student.bloodGroup" label="Blood group" options={bloodGroupOptions} />
					</Col>

					<Col span={12} style={{ margin: '10px 0' }}>
						<FormDatePicker name="student.dateOfBirth" label="Date of birth" />
					</Col>

					<Col span={12} style={{ margin: '10px 0' }}>
						<FormTextArea name="student.presentAddress" label="Present address" rows={4} />
					</Col>

					<Col span={12} style={{ margin: '10px 0' }}>
						<FormTextArea name="student.permanentAddress" label="Parmanent address" rows={4} />
					</Col>
				</Row>
			</div>
		</>
	);
}
