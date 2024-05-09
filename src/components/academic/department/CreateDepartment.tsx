import { Form, FormInput, FormSelectField } from '@/components/forms';
import { useAddAcademicDepartmentMutation } from '@/redux/apis/academic/departmentApi';
import { useAcademicFacultiesQuery } from '@/redux/apis/academic/facultyApi';
import { logger } from '@/services';
import { IError, SelectOption } from '@/types';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { Col, Row } from 'antd';
import React from 'react';

type FormData = {
	title: string;
	academicDepartmentId: string;
};

function CreateDepartment() {
	const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
	const { data, isLoading } = useAcademicFacultiesQuery({ limit: 100, page: 1 });

	if (isLoading) return <Spinner />;

	const academicFacultyOptions = data?.academicFaculties?.map(faculty => {
		return {
			label: faculty.title,
			value: faculty.id,
		};
	});

	const handleSubmit = async (values: FormData) => {
		try {
			await addAcademicDepartment(values).unwrap();
			notifySuccess('academic department added successfully');
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
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'department', link: '/admin/academic/department' },
					{ label: 'create', link: `/admin/academic/department/create` },
				]}
			/>
			<ActionBar title={`create academic department`}></ActionBar>
			<Form onSubmit={handleSubmit}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="title" label="Academic department title" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormSelectField
								options={academicFacultyOptions as SelectOption[]}
								name="academicFacultyId"
								label="Academic faculty"
							/>
						</div>
					</Col>
				</Row>
				<div>
					<PHUButton htmlType="submit" style={{ margin: '5px 0px' }}>
						add
					</PHUButton>
				</div>
			</Form>
		</>
	);
}

export default CreateDepartment;
