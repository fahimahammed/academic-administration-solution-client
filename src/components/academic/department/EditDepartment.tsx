import { Form, FormInput, FormSelectField } from '@/components/forms';
import { useAcademicDepartmentQuery, useUpdateAcademicDepartmentMutation } from '@/redux/apis/academic/departmentApi';
import { useAcademicFacultiesQuery } from '@/redux/apis/academic/facultyApi';
import { logger } from '@/services';
import { IError, SelectOption } from '@/types';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { Col } from 'antd';
import React from 'react';

type FormData = {
	title: string;
};

function EditDepartment({ id }: { id: string }) {
	const { data: department, isLoading: isLoadingDepartment } = useAcademicDepartmentQuery(id);
	const { data: faculties, isLoading: isLoadingFaculties } = useAcademicFacultiesQuery({ limit: 100, page: 1 });

	const [updateAcademicDepartment] = useUpdateAcademicDepartmentMutation();

	const handleSubmit = async (values: FormData) => {
		try {
			await updateAcademicDepartment({ id, body: values }).unwrap();
			notifySuccess('academic department updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoadingDepartment || isLoadingFaculties) return <Spinner />;

	const defaultValues = {
		title: department?.title || '',
		academicFaculty: department?.academicFaculty?.title || '',
	};

	const academicFacultyOptions = faculties?.academicFaculties?.map(faculty => {
		return {
			label: faculty.title,
			value: faculty.id,
		};
	});

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'department', link: '/admin/academic/department' },
					{ label: 'edit', link: `/admin/academic/department/edit/${id}` },
				]}
			/>
			<ActionBar title={`edit academic department`}></ActionBar>
			<Form onSubmit={handleSubmit} defaultValues={defaultValues}>
				<Col span={8} style={{ margin: '10px 0' }}>
					<div style={{ margin: '10px 0' }}>
						<FormInput name="title" label="Academic department title" />
					</div>
					<div style={{ margin: '10px 0' }}>
						<FormSelectField
							options={academicFacultyOptions as SelectOption[]}
							name="academicFaculty"
							label="Academic faculty"
						/>
					</div>
				</Col>
				<div>
					<PHUButton htmlType="submit" style={{ margin: '5px 0px' }}>
						update
					</PHUButton>
				</div>
			</Form>
		</>
	);
}

export default EditDepartment;
