import { FormInput } from '@/components/forms';
import { Col, Row } from 'antd';
import React from 'react';

export default function GuardianInfo() {
	return (
		<>
			<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
				<p style={{ fontSize: '18px', fontWeight: '500', margin: '5px 0px' }}>Guardian information</p>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.guardian.fatherName" label="Father name" />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.guardian.fatherOccupation" label="Father occupation" />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.guardian.fatherContactNo" label="Father contact no." />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.guardian.motherName" label="Mother name" />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.guardian.motherOccupation" label="Mother occupation" />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.guardian.motherContactNo" label="Mother contact no." />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.guardian.address" label="Address" />
					</Col>
				</Row>
			</div>
		</>
	);
}
