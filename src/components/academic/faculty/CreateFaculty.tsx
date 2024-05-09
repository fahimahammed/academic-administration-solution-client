import { Form, FormInput } from '@/components/forms';
import { useAddAcademicFacultyMutation } from '@/redux/apis/academic/facultyApi';
import { logger } from '@/services';
import { IError } from '@/types';
import { ActionBar, BreadCrumbsComp } from '@/ui';
import PHUButton from '@/ui/PHUButton';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { Col, Row } from 'antd';
import React from 'react';

type FormData = {
	title: string;
};

function CreateFaculty() {
	const [addAcademicFaculty] = useAddAcademicFacultyMutation();

	const handleSubmit = async (values: FormData) => {
		try {
			await addAcademicFaculty(values).unwrap();
			notifySuccess('academic faculty added successfully');
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
					{ label: 'faculty', link: '/admin/academic/faculty' },
					{ label: 'create', link: `/admin/academic/faculty/create}` },
				]}
			/>
			<ActionBar title={`create faculty`}></ActionBar>
			<Form onSubmit={handleSubmit}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8}>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="title" label="Academic faculty title" />
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

export default CreateFaculty;
