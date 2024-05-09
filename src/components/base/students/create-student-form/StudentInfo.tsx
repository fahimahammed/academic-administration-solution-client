import { FormInput, FormSelectField } from '@/components/forms';
import { Col, Row } from 'antd';
import React from 'react';
import AcademicSemester from '../AcademicSemester';
import AcademicDepartmentField from '../../common-form-field/AcademicDepartmentField';
import AcademicFacultyField from '../../common-form-field/AcademicFacultyField';
import UploadImage from '@/ui/PHUUploadImage';
import { genderOptions } from '@/constants';

export default function StudentInfo() {
	return (
		<>
			<div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.name.firstName" label="first name" />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.name.middleName" label="middle name" />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput name="student.name.lastName" label="last name" />
					</Col>

					<Col span={6} style={{ margin: '10px 0' }}>
						<FormInput type="password" name="password" label="Password" />
					</Col>

					<Col span={8} style={{ margin: '10px 0' }}>
						<AcademicFacultyField name="student.academicFaculty" label="academic faculty" />
					</Col>

					<Col span={8} style={{ margin: '10px 0' }}>
						<AcademicDepartmentField name="student.academicDepartment" label="academic department" />
					</Col>

					<Col span={8} style={{ margin: '10px 0' }}>
						<AcademicSemester name="student.academicSemester" label="academic semester" />
					</Col>

					<Col span={8} style={{ margin: '10px 0' }}>
						<FormSelectField name="student.gender" label="Gender" options={genderOptions} />
					</Col>

					<Col span={8} style={{ margin: '10px 0' }}>
						<UploadImage name="file" />
					</Col>
				</Row>
			</div>
		</>
	);
}
