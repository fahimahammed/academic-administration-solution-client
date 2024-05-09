import { Form, FormInput } from '@/components/forms';
import { useAcademicFacultyQuery, useUpdateAcademicFacultyMutation } from '@/redux/apis/academic/facultyApi';
import { logger } from '@/services';
import { IError } from '@/types';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { Col, Row } from 'antd';
import React from 'react';

type FormData = {
	title: string;
};

function EditFaculty({ id }: { id: string }) {
	const { data, isLoading } = useAcademicFacultyQuery(id);
	const [updateAcademicFaculty] = useUpdateAcademicFacultyMutation();

	const handleSubmit = async (values: FormData) => {
		try {
			await updateAcademicFaculty({ id, body: values }).unwrap();
			notifySuccess('academic faculty updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		title: data?.title || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'faculty', link: '/admin/academic/faculty' },
					{ label: 'edit', link: `/admin/academic/faculty/edit/${id}` },
				]}
			/>
			<ActionBar title={`edit faculty`}></ActionBar>
			<Form onSubmit={handleSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8}>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="title" label="Academic faculty title" />
						</div>
					</Col>
				</Row>
				<div>
					<PHUButton htmlType="submit" style={{ margin: '5px 0px' }}>
						update
					</PHUButton>
				</div>
			</Form>
		</>
	);
}

export default EditFaculty;
