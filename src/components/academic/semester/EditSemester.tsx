import { Form, FormInput, FormPicker, FormSelectField } from '@/components/forms';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { Col, Row } from 'antd';
import Button from '@/ui/Button';
import { monthOptions } from '@/constants';
import { useAcademicSemesterQuery, useUpdateAcademicSemesterMutation } from '@/redux/apis/academic/semesterApi';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { logger } from '@/services';
import { IAcademicSemesterPayload } from '@/types/academic/semester';
import { parsedSemesterRequestPayload } from '@/transformer/academic/semester';
import { IError } from '@/types';

const EditSemester = ({ id }: { id: string }) => {
	const { data, isLoading } = useAcademicSemesterQuery(id);
	const [updateAcademicSemester] = useUpdateAcademicSemesterMutation();

	const adminOnSubmit = async (values: IAcademicSemesterPayload) => {
		try {
			const parsedRequestBody = parsedSemesterRequestPayload(values);
			await updateAcademicSemester({ id, body: parsedRequestBody }).unwrap();
			notifySuccess('Academic semester updated successfully');
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	if (isLoading) return <Spinner />;

	const defaultValues = {
		title: data?.title || '',
		code: data?.code || '',
		startMonth: data?.startMonth || '',
		endMonth: data?.endMonth || '',
		year: data?.year || '',
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'academic', link: '' },
					{ label: 'semester', link: '/admin/academic/semester' },
					{ label: 'edit', link: `/admin/academic/semester/edit/${id}` },
				]}
			/>
			<ActionBar title="create academic semester"></ActionBar>
			<Form onSubmit={adminOnSubmit} defaultValues={defaultValues}>
				<Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
					<Col span={8} style={{ margin: '10px 0' }}>
						<div style={{ margin: '10px 0' }}>
							<FormInput name="title" label="title" />
						</div>

						<div style={{ margin: '10px 0' }}>
							<FormInput name="code" label="code" />
						</div>

						<div style={{ margin: '10px 0' }}>
							<FormSelectField name="startMonth" options={monthOptions} label="start month" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormSelectField name="endMonth" options={monthOptions} label="end month" />
						</div>
						<div style={{ margin: '10px 0' }}>
							<FormPicker name="year" picker="year" />
						</div>
					</Col>
				</Row>
				<Button htmlType="submit">update</Button>
			</Form>
		</>
	);
};

export default EditSemester;
